<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\BookModel;
use App\Models\CategoryModel;

class BookController extends BaseController
{
    protected $bookModel;
    protected $categoryModel;

    public function __construct()
    {
        $this->bookModel     = new BookModel();
        $this->categoryModel = new CategoryModel();
    }

    public function index()
    {
        $books = $this->bookModel->getBooksWithCategory();

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Data buku berhasil diambil',
            'data'    => $books,
        ]);
    }

    public function show($id = null)
    {
        $book = $this->bookModel->getBookWithCategory($id);

        if (!$book) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Buku tidak ditemukan',
            ]);
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Detail buku berhasil diambil',
            'data'    => $book,
        ]);
    }

    public function ebooks()
    {
        $books = $this->bookModel
            ->select('books.*, categories.name AS category_name')
            ->join('categories', 'categories.id = books.category_id')
            ->where('books.type', 'ebook')
            ->findAll();

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Data e-book berhasil diambil',
            'data'    => $books,
        ]);
    }

    public function physical()
    {
        $books = $this->bookModel
            ->select('books.*, categories.name AS category_name')
            ->join('categories', 'categories.id = books.category_id')
            ->where('books.type', 'physical')
            ->findAll();

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Data buku fisik berhasil diambil',
            'data'    => $books,
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if (!$data) {
            $data = $this->request->getPost();
        }

        if (
            empty($data['category_id']) ||
            empty($data['title']) ||
            empty($data['slug']) ||
            empty($data['author']) ||
            empty($data['type'])
        ) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'category_id, title, slug, author, dan type wajib diisi',
            ]);
        }

        $category = $this->categoryModel->find($data['category_id']);

        if (!$category) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Kategori tidak valid',
            ]);
        }

        if (!in_array($data['type'], ['ebook', 'physical'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Type buku harus ebook atau physical',
            ]);
        }

        if ($data['type'] === 'ebook' && empty($data['pdf_file'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Buku e-book wajib memiliki file PDF',
            ]);
        }

        if ($data['type'] === 'physical' && (int) ($data['stock_total'] ?? 0) <= 0) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Buku fisik wajib memiliki stok lebih dari 0',
            ]);
        }

        $bookData = [
            'category_id'      => $data['category_id'],
            'title'            => $data['title'],
            'slug'             => $data['slug'],
            'author'           => $data['author'],
            'publisher'        => $data['publisher'] ?? null,
            'publication_year' => $data['publication_year'] ?? null,
            'isbn'             => $data['isbn'] ?? null,
            'description'      => $data['description'] ?? null,
            'type'             => $data['type'],
            'cover_image'      => $data['cover_image'] ?? null,
            'pdf_file'         => $data['type'] === 'ebook' ? ($data['pdf_file'] ?? null) : null,
            'stock_total'      => $data['type'] === 'physical' ? (int) ($data['stock_total'] ?? 0) : 0,
            'stock_available'  => $data['type'] === 'physical' ? (int) ($data['stock_available'] ?? $data['stock_total']) : 0,
        ];

        $this->bookModel->insert($bookData);

        return $this->response->setStatusCode(201)->setJSON([
            'status'  => true,
            'message' => 'Buku berhasil ditambahkan',
            'data'    => array_merge(['id' => $this->bookModel->getInsertID()], $bookData),
        ]);
    }

    public function update($id = null)
    {
        $book = $this->bookModel->find($id);

        if (!$book) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Buku tidak ditemukan',
            ]);
        }

        $data = $this->request->getJSON(true);

        if (!$data) {
            $data = $this->request->getRawInput();
        }

        $updateData = [
            'category_id'      => $data['category_id'] ?? $book['category_id'],
            'title'            => $data['title'] ?? $book['title'],
            'slug'             => $data['slug'] ?? $book['slug'],
            'author'           => $data['author'] ?? $book['author'],
            'publisher'        => $data['publisher'] ?? $book['publisher'],
            'publication_year' => $data['publication_year'] ?? $book['publication_year'],
            'isbn'             => $data['isbn'] ?? $book['isbn'],
            'description'      => $data['description'] ?? $book['description'],
            'type'             => $data['type'] ?? $book['type'],
            'cover_image'      => $data['cover_image'] ?? $book['cover_image'],
            'pdf_file'         => $data['pdf_file'] ?? $book['pdf_file'],
            'stock_total'      => $data['stock_total'] ?? $book['stock_total'],
            'stock_available'  => $data['stock_available'] ?? $book['stock_available'],
        ];

        $this->bookModel->update($id, $updateData);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Buku berhasil diperbarui',
        ]);
    }

    public function delete($id = null)
    {
        $book = $this->bookModel->find($id);

        if (!$book) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Buku tidak ditemukan',
            ]);
        }

        $this->bookModel->delete($id);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Buku berhasil dihapus',
        ]);
    }
}
