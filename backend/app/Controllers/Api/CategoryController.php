<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\CategoryModel;

class CategoryController extends BaseController
{
    protected $categoryModel;

    public function __construct()
    {
        $this->categoryModel = new CategoryModel();
    }

    public function index()
    {
        $categories = $this->categoryModel->findAll();

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Data kategori berhasil diambil',
            'data'    => $categories,
        ]);
    }

    public function show($id = null)
    {
        $category = $this->categoryModel->find($id);

        if (!$category) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Kategori tidak ditemukan',
            ]);
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Detail kategori berhasil diambil',
            'data'    => $category,
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if (!$data) {
            $data = $this->request->getPost();
        }

        if (empty($data['name']) || empty($data['slug'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Nama dan slug kategori wajib diisi',
            ]);
        }

        $this->categoryModel->insert([
            'name'        => $data['name'],
            'slug'        => $data['slug'],
            'description' => $data['description'] ?? null,
        ]);

        return $this->response->setStatusCode(201)->setJSON([
            'status'  => true,
            'message' => 'Kategori berhasil ditambahkan',
            'data'    => [
                'id'          => $this->categoryModel->getInsertID(),
                'name'        => $data['name'],
                'slug'        => $data['slug'],
                'description' => $data['description'] ?? null,
            ],
        ]);
    }

    public function update($id = null)
    {
        $category = $this->categoryModel->find($id);

        if (!$category) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Kategori tidak ditemukan',
            ]);
        }

        $data = $this->request->getJSON(true);

        if (!$data) {
            $data = $this->request->getRawInput();
        }

        $this->categoryModel->update($id, [
            'name'        => $data['name'] ?? $category['name'],
            'slug'        => $data['slug'] ?? $category['slug'],
            'description' => $data['description'] ?? $category['description'],
        ]);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Kategori berhasil diperbarui',
        ]);
    }

    public function delete($id = null)
    {
        $category = $this->categoryModel->find($id);

        if (!$category) {
            return $this->response->setStatusCode(404)->setJSON([
                'status'  => false,
                'message' => 'Kategori tidak ditemukan',
            ]);
        }

        $this->categoryModel->delete($id);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Kategori berhasil dihapus',
        ]);
    }
}
