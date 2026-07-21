<?php

namespace App\Models;

use CodeIgniter\Model;

class BookModel extends Model
{
    protected $table            = 'books';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';

    protected $allowedFields = [
        'category_id',
        'title',
        'slug',
        'author',
        'publisher',
        'publication_year',
        'isbn',
        'description',
        'type',
        'cover_image',
        'pdf_file',
        'stock_total',
        'stock_available',
    ];

    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    public function getBooksWithCategory()
    {
        return $this->select('books.*, categories.name AS category_name')
            ->join('categories', 'categories.id = books.category_id')
            ->findAll();
    }

    public function getBookWithCategory($id)
    {
        return $this->select('books.*, categories.name AS category_name')
            ->join('categories', 'categories.id = books.category_id')
            ->where('books.id', $id)
            ->first();
    }
}
