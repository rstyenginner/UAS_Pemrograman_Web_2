<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $email = 'Hendra@gmail.com';

        $existingAdmin = $this->db->table('users')
            ->where('email', $email)
            ->get()
            ->getRowArray();

        if (!$existingAdmin) {
            $this->db->table('users')->insert([
                'name'       => 'Hendra Suhendar',
                'email'      => $email,
                'password'   => password_hash('1234', PASSWORD_DEFAULT),
                'role'       => 'admin',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }
    }
}
