# Logbook Minggu 2
# Sistem Manajemen Buku Digital Berbasis REST API

## Identitas Kegiatan

| Keterangan | Isi |
|---|---|
| Nama Project | Sistem Manajemen Buku Digital Berbasis REST API |
| Minggu | Minggu ke-2 |
| Fokus Kegiatan | Database Engineer dan Backend Developer |
| Tools | CodeIgniter 4, MySQL/MariaDB, phpMyAdmin, Postman, VS Code, Composer |
| Output Utama | Database, migration, seeder, model, controller, route API, JWT, dan testing Postman |

---

## Ringkasan Kegiatan Minggu 2

Pada minggu kedua, kegiatan difokuskan pada implementasi teknis bagian **Database Engineer** dan **Backend Developer**. Tahapan dimulai dari perancangan struktur database, pembuatan relasi tabel, implementasi migration dan seeder menggunakan CodeIgniter 4, kemudian dilanjutkan dengan pembuatan REST API.

Pada bagian backend, sistem mulai dikembangkan menggunakan konsep REST API berbasis JSON. Endpoint dibuat untuk fitur autentikasi, kategori, buku, dan peminjaman. Selain itu, sistem juga mulai menerapkan autentikasi menggunakan **JWT (JSON Web Token)** agar endpoint tertentu hanya dapat diakses oleh user yang sudah login.

---

## 1. Kegiatan Database Engineer

### 1.1 Perancangan Database

Pada tahap ini dilakukan perancangan database untuk mendukung kebutuhan sistem manajemen buku digital. Database diberi nama:

```text
digital_library_db
```

Tabel utama yang dirancang:

| No | Tabel | Fungsi |
|---|---|---|
| 1 | `users` | Menyimpan data admin dan member |
| 2 | `categories` | Menyimpan kategori buku |
| 3 | `books` | Menyimpan data buku digital dan buku fisik |
| 4 | `borrowings` | Menyimpan data peminjaman buku fisik |

Relasi database:

```text
users      1 --- many borrowings
categories 1 --- many books
books      1 --- many borrowings
```

---

### 1.2 Pembuatan ERD

ERD dibuat untuk menggambarkan hubungan antar tabel dalam sistem. Relasi utama yang digunakan adalah:

1. Satu user dapat memiliki banyak data peminjaman.
2. Satu kategori dapat memiliki banyak buku.
3. Satu buku dapat memiliki banyak data peminjaman.

ERD membantu memastikan struktur database sudah sesuai dengan kebutuhan sistem sebelum diimplementasikan ke CodeIgniter 4.

---

### 1.3 Pembuatan Migration

Migration dibuat menggunakan fitur CodeIgniter 4 agar struktur tabel dapat dibuat secara otomatis dan terdokumentasi.

Migration yang dibuat:

| No | Migration | Tabel |
|---|---|---|
| 1 | `CreateUsersTable` | `users` |
| 2 | `CreateCategoriesTable` | `categories` |
| 3 | `CreateBooksTable` | `books` |
| 4 | `CreateBorrowingsTable` | `borrowings` |

Perintah yang digunakan:

```bash
php spark make:migration CreateUsersTable
php spark make:migration CreateCategoriesTable
php spark make:migration CreateBooksTable
php spark make:migration CreateBorrowingsTable
```

Setelah migration dibuat, migration dijalankan dengan perintah:

```bash
php spark migrate
```

Hasilnya, tabel berhasil dibuat di database MySQL/MariaDB.

---

### 1.4 Pembuatan Seeder

Seeder dibuat untuk mengisi data awal pada database agar sistem dapat langsung diuji melalui API.

Seeder yang dibuat:

| No | Seeder | Fungsi |
|---|---|---|
| 1 | `UserSeeder` | Mengisi data admin dan member |
| 2 | `CategorySeeder` | Mengisi data kategori buku |
| 3 | `BookSeeder` | Mengisi data buku digital dan buku fisik |
| 4 | `BorrowingSeeder` | Mengisi data contoh peminjaman |

Perintah yang digunakan:

```bash
php spark make:seeder UserSeeder
php spark make:seeder CategorySeeder
php spark make:seeder BookSeeder
php spark make:seeder BorrowingSeeder
```

Seeder dijalankan dengan urutan:

```bash
php spark db:seed UserSeeder
php spark db:seed CategorySeeder
php spark db:seed BookSeeder
php spark db:seed BorrowingSeeder
```

Urutan tersebut penting karena tabel saling berelasi. Data user dan kategori harus tersedia terlebih dahulu sebelum data buku dan peminjaman dimasukkan.

---

### 1.5 Pengujian Database

Database diuji melalui phpMyAdmin dan query SQL untuk memastikan relasi antar tabel berjalan dengan benar.

Contoh query untuk menampilkan buku beserta kategorinya:

```sql
SELECT 
    books.id,
    books.title,
    books.type,
    books.stock_available,
    categories.name AS category_name
FROM books
JOIN categories ON books.category_id = categories.id;
```

Contoh query untuk menampilkan data peminjaman:

```sql
SELECT
    borrowings.id,
    users.name AS member_name,
    books.title AS book_title,
    borrowings.borrow_date,
    borrowings.due_date,
    borrowings.status
FROM borrowings
JOIN users ON borrowings.user_id = users.id
JOIN books ON borrowings.book_id = books.id;
```

Hasil pengujian menunjukkan bahwa data antar tabel berhasil terhubung dengan baik.

---

### 1.6 Export Database

Database juga disiapkan untuk kebutuhan dokumentasi dan pengumpulan project.

File export yang disiapkan:

| File | Isi |
|---|---|
| `schema.sql` | Struktur tabel database |
| `seeders.sql` | Data awal/dummy |
| `full_database.sql` | Struktur dan data database |

File tersebut disimpan pada folder:

```text
database/
```

---

## 2. Kegiatan Backend Developer

### 2.1 Setup Backend CodeIgniter 4

Backend dibuat menggunakan CodeIgniter 4. Struktur project dibuat dengan memisahkan backend, frontend, database, dan dokumentasi.

Struktur folder utama:

```text
project/
├── backend/
├── frontend/
├── database/
├── docs/
└── README.md
```

Backend dijalankan menggunakan perintah:

```bash
php spark serve
```

Base URL backend:

```text
http://localhost:8080
```

---

### 2.2 Konfigurasi Database di `.env`

File `.env` dikonfigurasi agar backend dapat terhubung ke database.

Konfigurasi database:

```env
database.default.hostname = localhost
database.default.database = digital_library_db
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.DBPrefix =
database.default.port = 3306
```

Setelah konfigurasi selesai, backend dapat mengakses database melalui model CodeIgniter 4.

---

### 2.3 Pembuatan Model

Model dibuat untuk menghubungkan controller dengan tabel database.

Model yang dibuat:

| No | Model | Tabel |
|---|---|---|
| 1 | `UserModel.php` | `users` |
| 2 | `CategoryModel.php` | `categories` |
| 3 | `BookModel.php` | `books` |
| 4 | `BorrowingModel.php` | `borrowings` |

Perintah yang digunakan:

```bash
php spark make:model UserModel
php spark make:model CategoryModel
php spark make:model BookModel
php spark make:model BorrowingModel
```

Model berfungsi untuk mengambil, menyimpan, memperbarui, dan menghapus data dari database.

---

### 2.4 Pembuatan Controller API

Controller dibuat di dalam folder:

```text
app/Controllers/Api/
```

Controller yang dibuat:

| No | Controller | Fungsi |
|---|---|---|
| 1 | `AuthController.php` | Register, login, dan JWT token |
| 2 | `CategoryController.php` | Mengelola data kategori |
| 3 | `BookController.php` | Mengelola data buku |
| 4 | `BorrowingController.php` | Mengelola peminjaman buku |

Perintah yang digunakan:

```bash
php spark make:controller Api/AuthController
php spark make:controller Api/CategoryController
php spark make:controller Api/BookController
php spark make:controller Api/BorrowingController
```

Controller dibuat dengan response JSON agar sesuai dengan konsep REST API.

---

### 2.5 Pembuatan Route API

Route API ditulis pada file:

```text
app/Config/Routes.php
```

Route dibuat untuk menghubungkan endpoint dengan controller.

Endpoint utama yang dibuat:

#### Auth API

```text
POST /api/register
POST /api/login
```

#### Category API

```text
GET    /api/categories
GET    /api/categories/{id}
POST   /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

#### Book API

```text
GET    /api/books
GET    /api/books/ebooks
GET    /api/books/physical
GET    /api/books/{id}
POST   /api/books
PUT    /api/books/{id}
DELETE /api/books/{id}
```

#### Borrowing API

```text
GET  /api/borrowings
GET  /api/borrowings/{id}
GET  /api/my-borrowings
POST /api/borrowings
PUT  /api/borrowings/{id}/approve
PUT  /api/borrowings/{id}/reject
PUT  /api/borrowings/{id}/return
```

---

## 3. Implementasi JWT

### 3.1 Alasan Menggunakan JWT

JWT digunakan karena sistem berbasis REST API dan membutuhkan autentikasi untuk membedakan user yang sudah login dan belum login.

JWT berfungsi sebagai token akses yang diberikan setelah login berhasil.

Alur JWT:

```text
User login
↓
Backend memeriksa email dan password
↓
Jika benar, backend membuat token JWT
↓
Token dikirim ke frontend/Postman
↓
Token digunakan untuk mengakses endpoint protected
↓
Backend mengecek token melalui filter
```

---

### 3.2 Install Library JWT

Library JWT diinstall menggunakan Composer:

```bash
composer require firebase/php-jwt
```

Library ini digunakan untuk membuat dan membaca token JWT.

---

### 3.3 Konfigurasi JWT di `.env`

Pada file `.env`, ditambahkan konfigurasi:

```env
JWT_SECRET = sistem_manajemen_buku_digital_secret_key
JWT_EXPIRED_TIME = 3600
```

Keterangan:

| Konfigurasi | Fungsi |
|---|---|
| `JWT_SECRET` | Kunci rahasia token |
| `JWT_EXPIRED_TIME` | Masa berlaku token |
| `3600` | Token berlaku selama 1 jam |

---

### 3.4 Perubahan pada AuthController

Pada `AuthController`, method `login()` diubah agar menghasilkan JWT token.

Sebelumnya login hanya mengembalikan data user. Setelah JWT diterapkan, login mengembalikan data user dan token.

Contoh response login:

```json
{
  "status": true,
  "message": "Login berhasil",
  "token": "TOKEN_JWT",
  "data": {
    "id": 4,
    "name": "Member Tiga",
    "email": "member3@example.com",
    "role": "member"
  }
}
```

---

### 3.5 Pembuatan JwtFilter

File filter dibuat pada:

```text
app/Filters/JwtFilter.php
```

Fungsi `JwtFilter`:

1. Mengecek header `Authorization`.
2. Mengecek format `Bearer Token`.
3. Decode token JWT.
4. Menolak request jika token tidak ada atau tidak valid.
5. Mengizinkan request jika token valid.

---

### 3.6 Pendaftaran Filter JWT

Filter JWT didaftarkan pada file:

```text
app/Config/Filters.php
```

Alias yang ditambahkan:

```php
'jwt' => \App\Filters\JwtFilter::class,
```

Setelah filter terdaftar, filter dapat digunakan pada route protected.

---

### 3.7 Pemisahan Public Route dan Protected Route

Route dibagi menjadi dua jenis:

#### Public Route

Public route dapat diakses tanpa token.

```text
POST /api/register
POST /api/login
GET  /api/categories
GET  /api/books
GET  /api/books/ebooks
GET  /api/books/physical
```

#### Protected Route

Protected route wajib menggunakan JWT.

```text
POST   /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
POST   /api/books
PUT    /api/books/{id}
DELETE /api/books/{id}
GET    /api/borrowings
GET    /api/my-borrowings
POST   /api/borrowings
PUT    /api/borrowings/{id}/approve
PUT    /api/borrowings/{id}/reject
PUT    /api/borrowings/{id}/return
```

---

## 4. Perubahan pada Borrowing Setelah JWT

Setelah JWT diterapkan, endpoint peminjaman menjadi lebih aman karena `user_id` tidak lagi dikirim manual dari frontend atau Postman.

### Sebelum JWT

Riwayat peminjaman menggunakan:

```text
GET /api/my-borrowings/{user_id}
```

Create borrowing menggunakan body:

```json
{
  "user_id": 4,
  "book_id": 2,
  "borrow_date": "2026-07-01",
  "due_date": "2026-07-08"
}
```

### Setelah JWT

Riwayat peminjaman berubah menjadi:

```text
GET /api/my-borrowings
```

Create borrowing menggunakan body:

```json
{
  "book_id": 2,
  "borrow_date": "2026-07-01",
  "due_date": "2026-07-08"
}
```

`user_id` otomatis diambil dari token JWT.

---

## 5. Testing API Menggunakan Postman

Postman digunakan untuk menguji endpoint API dan menyimpan dokumentasi API.

Struktur collection Postman:

```text
Sistem Manajemen Buku Digital API
├── Auth
│   ├── Register Member
│   ├── Login Member
│   └── Login Admin
├── Categories
│   ├── Get All Categories
│   ├── Get Category Detail
│   ├── Create Category
│   ├── Update Category
│   └── Delete Category
├── Books
│   ├── Get All Books
│   ├── Get Ebooks
│   ├── Get Physical Books
│   ├── Get Book Detail
│   ├── Create Ebook
│   ├── Create Physical Book
│   ├── Update Book
│   └── Delete Book
└── Borrowings
    ├── Get All Borrowings - Admin
    ├── Get Borrowing Detail
    ├── Get My Borrowings - Member
    ├── Create Borrowing - Member
    ├── Approve Borrowing - Admin
    ├── Reject Borrowing - Admin
    └── Return Borrowing - Admin
```

---

### 5.1 Testing Login Member

```text
POST http://localhost:8080/api/login
```

Body:

```json
{
  "email": "member3@example.com",
  "password": "member123"
}
```

Hasil:

1. Login berhasil.
2. Backend mengirim JWT token.
3. Token member digunakan untuk endpoint member.

---

### 5.2 Testing Login Admin

```text
POST http://localhost:8080/api/login
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Hasil:

1. Login berhasil.
2. Backend mengirim JWT token admin.
3. Token admin digunakan untuk endpoint admin.

---

### 5.3 Testing Endpoint Protected Tanpa Token

Endpoint protected diuji tanpa token untuk memastikan sistem menolak request yang tidak memiliki akses.

Contoh:

```text
GET http://localhost:8080/api/my-borrowings
```

Hasil yang diharapkan:

```json
{
  "status": false,
  "message": "Token tidak ditemukan"
}
```

---

### 5.4 Testing Endpoint Protected dengan Token

Endpoint protected diuji dengan token pada tab Authorization Postman.

Format authorization:

```text
Authorization → Bearer Token → paste token
```

Contoh endpoint member:

```text
GET http://localhost:8080/api/my-borrowings
POST http://localhost:8080/api/borrowings
```

Contoh endpoint admin:

```text
GET http://localhost:8080/api/borrowings
PUT http://localhost:8080/api/borrowings/{id}/approve
PUT http://localhost:8080/api/borrowings/{id}/reject
PUT http://localhost:8080/api/borrowings/{id}/return
```

---

## 6. Hasil yang Dicapai

Hasil kegiatan minggu kedua:

1. Database berhasil dirancang.
2. ERD berhasil dibuat.
3. Migration berhasil dibuat dan dijalankan.
4. Seeder berhasil dibuat dan dijalankan.
5. Data dummy berhasil masuk ke database.
6. Relasi antar tabel berhasil diuji.
7. Backend CodeIgniter 4 berhasil dikonfigurasi.
8. Model berhasil dibuat.
9. Controller API berhasil dibuat.
10. Route API berhasil dibuat.
11. REST API berhasil mengembalikan response JSON.
12. Register dan login berhasil diuji.
13. JWT berhasil diterapkan pada login.
14. JwtFilter berhasil dibuat.
15. Route public dan protected berhasil dipisahkan.
16. Endpoint borrowing berhasil diubah agar menggunakan JWT.
17. Endpoint protected berhasil diuji menggunakan Bearer Token di Postman.
18. Struktur Postman Collection berhasil dirapikan.

---

## 7. Kendala yang Ditemui

| No | Kendala | Solusi |
|---|---|---|
| 1 | Koneksi database sempat gagal karena konfigurasi `.env` belum sesuai | Mengaktifkan file `.env` dan menyesuaikan konfigurasi database |
| 2 | Route tertentu menghasilkan 404 | Mengecek method HTTP dan menjalankan `php spark routes` |
| 3 | Register awalnya gagal membaca body JSON | Memastikan body Postman menggunakan raw JSON dan header `Content-Type: application/json` |
| 4 | Delete kategori dapat gagal karena kategori masih digunakan oleh buku | Memahami relasi foreign key dan tidak menghapus data yang masih dipakai |
| 5 | JWT belum tergambar alurnya | Memahami konsep login menghasilkan token dan endpoint protected memakai Bearer Token |
| 6 | Endpoint borrowing berubah setelah JWT | Menghapus `user_id` dari body dan mengambil user dari token |

---

## 8. Rencana Lanjutan

Rencana kegiatan setelah minggu kedua:

1. Menyelesaikan testing seluruh endpoint protected.
2. Menyimpan semua request Postman.
3. Export Postman Collection ke folder `docs`.
4. Memperbarui README backend dengan JWT.
5. Melanjutkan pengerjaan frontend.
6. Menghubungkan frontend dengan API backend.
7. Membuat halaman login dan register.
8. Membuat halaman katalog buku.
9. Membuat fitur membaca e-book dan mengajukan peminjaman buku fisik.
10. Melakukan integrasi frontend dengan JWT token.

---

## 9. Kesimpulan Minggu 2

Pada minggu kedua, pengerjaan project sudah masuk ke tahap implementasi teknis database dan backend. Dari sisi Database Engineer, database berhasil dirancang, dibuat, dan diisi dengan data awal menggunakan migration serta seeder CodeIgniter 4.

Dari sisi Backend Developer, REST API berhasil dibuat untuk autentikasi, kategori, buku, dan peminjaman. Sistem juga sudah mulai menggunakan JWT untuk mengamankan endpoint tertentu. Dengan JWT, user tidak perlu mengirim `user_id` secara manual ketika melakukan peminjaman, karena identitas user diambil langsung dari token login.

Hasil minggu kedua menjadi dasar penting untuk melanjutkan integrasi ke frontend pada tahap berikutnya.
