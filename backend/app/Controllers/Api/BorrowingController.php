<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\BorrowingModel;
use App\Models\BookModel;
use App\Models\UserModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class BorrowingController extends BaseController
{
    protected $borrowingModel;
    protected $bookModel;
    protected $userModel;

    public function __construct()
    {
        $this->borrowingModel = new BorrowingModel();
        $this->bookModel      = new BookModel();
        $this->userModel      = new UserModel();
    }

    private function getAuthUser()
    {
        $authHeader = $this->request->getHeaderLine('Authorization');

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return null;
        }

        try {
            return JWT::decode(
                $matches[1],
                new Key(getenv('JWT_SECRET'), 'HS256')
            );
        } catch (\Throwable $e) {
            return null;
        }
    }

    private function isAdmin()
    {
        $authUser = $this->getAuthUser();

        return $authUser && $authUser->role === 'admin';
    }

    public function index()
    {
        if (!$this->isAdmin()) {
            return $this->response->setStatusCode(403)->setJSON([
                'status'  => false,
                'message' => 'Akses ditolak. Hanya admin yang dapat melihat semua data peminjaman.',
            ]);
        }

        $borrowings = $this->borrowingModel->getBorrowingsWithDetail();

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Data peminjaman berhasil diambil',
            'data'    => $borrowings,
        ]);
    }

    public function show($id = null)
    {
        $authUser = $this->getAuthUser();

        if (!$authUser) {
            return $this->response->setStatusCode(401)->setJSON([
                'status'  => false,
                'message' => 'Token tidak valid',
            ]);
        }

        $borrowing = $this->borrowingModel->getBorrowingWithDetail($id);

        if (!$borrowing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ]);
        }

        // Admin boleh melihat semua detail.
        // Member hanya boleh melihat data peminjaman miliknya sendiri.
        if ($authUser->role !== 'admin' && (int) $borrowing['user_id'] !== (int) $authUser->uid) {
            return $this->response->setStatusCode(403)->setJSON([
                'status'  => false,
                'message' => 'Akses ditolak. Anda hanya dapat melihat data peminjaman milik sendiri.',
            ]);
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Detail peminjaman berhasil diambil',
            'data'    => $borrowing,
        ]);
    }

    public function myBorrowings()
    {
        $authUser = $this->getAuthUser();

        if (!$authUser) {
            return $this->response->setStatusCode(401)->setJSON([
                'status'  => false,
                'message' => 'Token tidak valid',
            ]);
        }

        $borrowings = $this->borrowingModel->getBorrowingsByUser($authUser->uid);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Riwayat peminjaman user berhasil diambil',
            'data'    => $borrowings,
        ]);
    }

    public function create()
    {
        $authUser = $this->getAuthUser();

        if (!$authUser) {
            return $this->response->setStatusCode(401)->setJSON([
                'status'  => false,
                'message' => 'Token tidak valid',
            ]);
        }

        if ($authUser->role !== 'member') {
            return $this->response->setStatusCode(403)->setJSON([
                'status'  => false,
                'message' => 'Akses ditolak. Hanya member yang dapat mengajukan peminjaman.',
            ]);
        }

        $data = $this->request->getJSON(true);

        if (!$data) {
            $data = json_decode($this->request->getBody(), true);
        }

        if (!$data) {
            $data = $this->request->getPost();
        }

        if (empty($data['book_id'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'book_id wajib diisi',
            ]);
        }

        $user = $this->userModel->find($authUser->uid);
        $book = $this->bookModel->find($data['book_id']);

        if (!$user) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'User tidak ditemukan',
            ]);
        }

        if (!$book) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Buku tidak ditemukan',
            ]);
        }

        if ($book['type'] !== 'physical') {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Buku digital tidak perlu dipinjam. Silakan baca PDF.',
            ]);
        }

        if ((int) $book['stock_available'] <= 0) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Stok buku tidak tersedia',
            ]);
        }

        $borrowDate = $data['borrow_date'] ?? date('Y-m-d');
        $dueDate    = $data['due_date'] ?? date('Y-m-d', strtotime('+7 days'));

        $borrowingData = [
            'user_id'     => $authUser->uid,
            'book_id'     => $data['book_id'],
            'borrow_date' => $borrowDate,
            'due_date'    => $dueDate,
            'return_date' => null,
            'status'      => 'pending',
            'note'        => $data['note'] ?? null,
        ];

        $this->borrowingModel->insert($borrowingData);

        return $this->response->setStatusCode(201)->setJSON([
            'status'  => true,
            'message' => 'Pengajuan peminjaman berhasil dibuat',
            'data'    => array_merge(
                ['id' => $this->borrowingModel->getInsertID()],
                $borrowingData
            ),
        ]);
    }

    public function approve($id = null)
    {
        if (!$this->isAdmin()) {
            return $this->response->setStatusCode(403)->setJSON([
                'status'  => false,
                'message' => 'Akses ditolak. Hanya admin yang dapat menyetujui peminjaman.',
            ]);
        }

        $borrowing = $this->borrowingModel->find($id);

        if (!$borrowing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ]);
        }

        if ($borrowing['status'] !== 'pending') {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Hanya peminjaman pending yang dapat disetujui',
            ]);
        }

        $book = $this->bookModel->find($borrowing['book_id']);

        if (!$book) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Buku tidak ditemukan',
            ]);
        }

        if ((int) $book['stock_available'] <= 0) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Stok buku tidak tersedia',
            ]);
        }

        $this->borrowingModel->update($id, [
            'status' => 'approved',
            'note'   => 'Peminjaman disetujui oleh admin.',
        ]);

        $this->bookModel->update($book['id'], [
            'stock_available' => (int) $book['stock_available'] - 1,
        ]);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Peminjaman berhasil disetujui',
        ]);
    }

    public function reject($id = null)
    {
        if (!$this->isAdmin()) {
            return $this->response->setStatusCode(403)->setJSON([
                'status'  => false,
                'message' => 'Akses ditolak. Hanya admin yang dapat menolak peminjaman.',
            ]);
        }

        $borrowing = $this->borrowingModel->find($id);

        if (!$borrowing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ]);
        }

        if ($borrowing['status'] !== 'pending') {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Hanya peminjaman pending yang dapat ditolak',
            ]);
        }

        $this->borrowingModel->update($id, [
            'status' => 'rejected',
            'note'   => 'Peminjaman ditolak oleh admin.',
        ]);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Peminjaman berhasil ditolak',
        ]);
    }

    public function returnBook($id = null)
    {
        if (!$this->isAdmin()) {
            return $this->response->setStatusCode(403)->setJSON([
                'status'  => false,
                'message' => 'Akses ditolak. Hanya admin yang dapat menandai buku dikembalikan.',
            ]);
        }

        $borrowing = $this->borrowingModel->find($id);

        if (!$borrowing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ]);
        }

        if ($borrowing['status'] !== 'approved') {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Hanya peminjaman approved yang dapat dikembalikan',
            ]);
        }

        $book = $this->bookModel->find($borrowing['book_id']);

        $this->borrowingModel->update($id, [
            'status'      => 'returned',
            'return_date' => date('Y-m-d'),
            'note'        => 'Buku sudah dikembalikan.',
        ]);

        if ($book) {
            $this->bookModel->update($book['id'], [
                'stock_available' => (int) $book['stock_available'] + 1,
            ]);
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Buku berhasil ditandai sudah dikembalikan',
        ]);
    }
}
