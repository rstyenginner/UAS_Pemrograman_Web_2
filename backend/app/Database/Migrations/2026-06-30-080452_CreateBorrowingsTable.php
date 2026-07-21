<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateBorrowingsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'BIGINT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'user_id' => [
                'type'     => 'BIGINT',
                'unsigned' => true,
            ],
            'book_id' => [
                'type'     => 'BIGINT',
                'unsigned' => true,
            ],
            'borrow_date' => [
                'type' => 'DATE',
            ],
            'due_date' => [
                'type' => 'DATE',
            ],
            'return_date' => [
                'type' => 'DATE',
                'null' => true,
            ],
            'status' => [
                'type'       => 'ENUM',
                'constraint' => ['pending', 'approved', 'rejected', 'returned'],
                'default'    => 'pending',
            ],
            'note' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('id', true);

        $this->forge->addForeignKey(
            'user_id',
            'users',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->forge->addForeignKey(
            'book_id',
            'books',
            'id',
            'CASCADE',
            'RESTRICT'
        );

        $this->forge->createTable('borrowings');
    }

    public function down()
    {
        $this->forge->dropTable('borrowings');
    }
}
