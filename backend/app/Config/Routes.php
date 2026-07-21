<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

$routes->group('api', function ($routes) {
    // Auth - public
    $routes->post('register', 'Api\AuthController::register');
    $routes->post('login', 'Api\AuthController::login');

    // Public read-only API
    $routes->get('categories', 'Api\CategoryController::index');
    $routes->get('categories/(:num)', 'Api\CategoryController::show/$1');

    $routes->get('books', 'Api\BookController::index');
    $routes->get('books/ebooks', 'Api\BookController::ebooks');
    $routes->get('books/physical', 'Api\BookController::physical');
    $routes->get('books/(:num)', 'Api\BookController::show/$1');
});

// Protected API - wajib token JWT
$routes->group('api', ['filter' => 'jwt'], function ($routes) {
    // Categories - create, update, delete
    $routes->post('categories', 'Api\CategoryController::create');
    $routes->put('categories/(:num)', 'Api\CategoryController::update/$1');
    $routes->delete('categories/(:num)', 'Api\CategoryController::delete/$1');

    // Books - create, update, delete
    $routes->post('books', 'Api\BookController::create');
    $routes->put('books/(:num)', 'Api\BookController::update/$1');
    $routes->delete('books/(:num)', 'Api\BookController::delete/$1');

    // Borrowings
    $routes->get('borrowings', 'Api\BorrowingController::index');
    $routes->get('borrowings/(:num)', 'Api\BorrowingController::show/$1');
    $routes->get('my-borrowings', 'Api\BorrowingController::myBorrowings');
    $routes->post('borrowings', 'Api\BorrowingController::create');
    $routes->put('borrowings/(:num)/approve', 'Api\BorrowingController::approve/$1');
    $routes->put('borrowings/(:num)/reject', 'Api\BorrowingController::reject/$1');
    $routes->put('borrowings/(:num)/return', 'Api\BorrowingController::returnBook/$1');
});
