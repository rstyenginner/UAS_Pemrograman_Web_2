<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader) {
            return service('response')->setStatusCode(401)->setJSON([
                'status'  => false,
                'message' => 'Token tidak ditemukan',
            ]);
        }

        if (!preg_match('/Bearer\\s(\\S+)/', $authHeader, $matches)) {
            return service('response')->setStatusCode(401)->setJSON([
                'status'  => false,
                'message' => 'Format token tidak valid',
            ]);
        }

        $token = $matches[1];

        try {
            $decoded = JWT::decode($token, new Key(getenv('JWT_SECRET'), 'HS256'));

            // Simpan data user dari token agar bisa dipakai controller.
            $request->user = $decoded;
        } catch (\Throwable $e) {
            return service('response')->setStatusCode(401)->setJSON([
                'status'  => false,
                'message' => 'Token tidak valid atau sudah expired',
            ]);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak perlu aksi setelah controller.
    }
}
