<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class BorrowingSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'user_id'     => 2,
                'book_id'     => 2,
                'borrow_date' => date('Y-m-d'),
                'due_date'    => date('Y-m-d', strtotime('+7 days')),
                'return_date' => null,
                'status'      => 'pending',
                'note'        => 'Pengajuan peminjaman buku fisik oleh member.',
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            ],
            [
                'user_id'     => 2,
                'book_id'     => 4,
                'borrow_date' => date('Y-m-d'),
                'due_date'    => date('Y-m-d', strtotime('+7 days')),
                'return_date' => null,
                'status'      => 'approved',
                'note'        => 'Peminjaman disetujui oleh admin.',
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('borrowings')->insertBatch($data);

        // Karena data kedua sudah approved, stok buku id 4 dikurangi 1.
        $this->db->table('books')
            ->where('id', 4)
            ->set('stock_available', 'stock_available - 1', false)
            ->update();
    }
}