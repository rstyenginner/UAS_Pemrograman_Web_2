<?php

namespace App\Models;

use CodeIgniter\Model;

class BorrowingModel extends Model
{
    protected $table            = 'borrowings';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';

    protected $allowedFields = [
        'user_id',
        'book_id',
        'borrow_date',
        'due_date',
        'return_date',
        'status',
        'note',
    ];

    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    public function getBorrowingsWithDetail()
    {
        return $this->select('borrowings.*, users.name AS member_name, books.title AS book_title')
            ->join('users', 'users.id = borrowings.user_id')
            ->join('books', 'books.id = borrowings.book_id')
            ->findAll();
    }

    public function getBorrowingWithDetail($id)
    {
        return $this->select('borrowings.*, users.name AS member_name, books.title AS book_title')
            ->join('users', 'users.id = borrowings.user_id')
            ->join('books', 'books.id = borrowings.book_id')
            ->where('borrowings.id', $id)
            ->first();
    }

    public function getBorrowingsByUser($userId)
    {
        return $this->select('borrowings.*, books.title AS book_title, books.type AS book_type')
            ->join('books', 'books.id = borrowings.book_id')
            ->where('borrowings.user_id', $userId)
            ->findAll();
    }
}
