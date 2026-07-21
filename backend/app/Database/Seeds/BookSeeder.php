<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'category_id'      => 1,
                'title'            => 'Belajar CodeIgniter 4 Dasar',
                'slug'             => 'belajar-codeigniter-4-dasar',
                'author'           => 'Ahmad Fauzi',
                'publisher'        => 'Informatika Press',
                'publication_year' => 2024,
                'isbn'             => '978-1111111111',
                'description'      => 'Buku digital pengantar CodeIgniter 4 untuk pemula.',
                'type'             => 'ebook',
                'cover_image'      => 'covers/ci4-dasar.jpg',
                'pdf_file'         => 'pdf/ci4-dasar.pdf',
                'stock_total'      => 0,
                'stock_available'  => 0,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'category_id'      => 1,
                'title'            => 'Dasar-Dasar Database MySQL',
                'slug'             => 'dasar-dasar-database-mysql',
                'author'           => 'Siti Aminah',
                'publisher'        => 'Tekno Media',
                'publication_year' => 2023,
                'isbn'             => '978-2222222222',
                'description'      => 'Buku fisik tentang dasar pengelolaan database MySQL.',
                'type'             => 'physical',
                'cover_image'      => 'covers/mysql-dasar.jpg',
                'pdf_file'         => null,
                'stock_total'      => 5,
                'stock_available'  => 5,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'category_id'      => 2,
                'title'            => 'Strategi Belajar Efektif',
                'slug'             => 'strategi-belajar-efektif',
                'author'           => 'Budi Santoso',
                'publisher'        => 'Edu Press',
                'publication_year' => 2022,
                'isbn'             => '978-3333333333',
                'description'      => 'E-book tentang strategi belajar efektif untuk siswa dan mahasiswa.',
                'type'             => 'ebook',
                'cover_image'      => 'covers/strategi-belajar.jpg',
                'pdf_file'         => 'pdf/strategi-belajar.pdf',
                'stock_total'      => 0,
                'stock_available'  => 0,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'category_id'      => 3,
                'title'            => 'Langit Senja di Perpustakaan',
                'slug'             => 'langit-senja-di-perpustakaan',
                'author'           => 'Dewi Lestari',
                'publisher'        => 'Sastra Kita',
                'publication_year' => 2021,
                'isbn'             => '978-4444444444',
                'description'      => 'Novel fiksi berlatar perpustakaan sekolah.',
                'type'             => 'physical',
                'cover_image'      => 'covers/langit-senja.jpg',
                'pdf_file'         => null,
                'stock_total'      => 3,
                'stock_available'  => 3,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('books')->insertBatch($data);
    }
}