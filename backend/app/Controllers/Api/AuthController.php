<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;
use Firebase\JWT\JWT;

class AuthController extends BaseController
{
    protected $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function register()
    {
        $data = $this->request->getJSON(true);

        if (!$data) {
            $data = $this->request->getPost();
        }

        if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Name, email, dan password wajib diisi',
            ]);
        }

        $existingUser = $this->userModel->where('email', $data['email'])->first();

        if ($existingUser) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Email sudah terdaftar',
            ]);
        }

        $userData = [
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
            'role'     => 'member',
        ];

        $this->userModel->insert($userData);

        return $this->response->setStatusCode(201)->setJSON([
            'status'  => true,
            'message' => 'Register berhasil',
            'data'    => [
                'id'    => $this->userModel->getInsertID(),
                'name'  => $userData['name'],
                'email' => $userData['email'],
                'role'  => $userData['role'],
            ],
        ]);
    }

    public function login()
{
    $data = $this->request->getJSON(true);

    if (!$data) {
        $data = json_decode($this->request->getBody(), true);
    }

    if (!$data) {
        $data = $this->request->getPost();
    }

    if (empty($data['email']) || empty($data['password'])) {
        return $this->response->setStatusCode(400)->setJSON([
            'status'  => false,
            'message' => 'Email dan password wajib diisi',
        ]);
    }

    $user = $this->userModel->where('email', $data['email'])->first();

    if (!$user) {
        return $this->response->setStatusCode(401)->setJSON([
            'status'  => false,
            'message' => 'Email atau password salah',
        ]);
    }

    if (!password_verify($data['password'], $user['password'])) {
        return $this->response->setStatusCode(401)->setJSON([
            'status'  => false,
            'message' => 'Email atau password salah',
        ]);
    }

    $issuedAt = time();
    $expiredTime = $issuedAt + (int) getenv('JWT_EXPIRED_TIME');

    $payload = [
        'iat'   => $issuedAt,
        'exp'   => $expiredTime,
        'uid'   => $user['id'],
        'email' => $user['email'],
        'role'  => $user['role'],
    ];

    $token = JWT::encode($payload, getenv('JWT_SECRET'), 'HS256');

    return $this->response->setJSON([
        'status'  => true,
        'message' => 'Login berhasil',
        'token'   => $token,
        'data'    => [
            'id'    => $user['id'],
            'name'  => $user['name'],
            'email' => $user['email'],
            'role'  => $user['role'],
        ],
    ]);
}
}
