# Backend Developer
# Sistem Manajemen Buku Digital Berbasis REST API dengan JWT

Dokumen ini menjelaskan pengerjaan peran **Backend Developer** pada project **Sistem Manajemen Buku Digital Berbasis REST API**.

Backend dibangun menggunakan **CodeIgniter 4** sebagai REST API. Semua response dikirim dalam format **JSON**. Sistem juga menggunakan **JWT (JSON Web Token)** untuk autentikasi dan pembatasan akses endpoint tertentu.

---

## 1. Tujuan Backend

Backend dibuat untuk:

1. Menghubungkan aplikasi dengan database MySQL/MariaDB.
2. Menyediakan endpoint REST API.
3. Mengelola register dan login user.
4. Menghasilkan JWT token saat login berhasil.
5. Melindungi endpoint tertentu menggunakan JWT.
6. Mengelola data kategori buku.
7. Mengelola data buku digital dan buku fisik.
8. Mengelola proses peminjaman buku fisik.
9. Membedakan akses antara `admin` dan `member`.
10. Menyediakan API yang dapat diuji dan didokumentasikan menggunakan Postman.

---

## 2. Teknologi yang Digunakan

| Teknologi | Fungsi |
|---|---|
| CodeIgniter 4 | Framework backend |
| PHP | Bahasa pemrograman backend |
| MySQL/MariaDB | Database |
| JWT | Autentikasi API |
| firebase/php-jwt | Library JWT untuk PHP |
| Composer | Dependency manager PHP |
| Postman | Testing dan dokumentasi API |
| Laragon/XAMPP | Local development server |

---

## 3. Struktur Folder Backend

```text
backend/
├── app/
│   ├── Config/
│   │   ├── Filters.php
│   │   └── Routes.php
│   ├── Controllers/
│   │   └── Api/
│   │       ├── AuthController.php
│   │       ├── CategoryController.php
│   │       ├── BookController.php
│   │       └── BorrowingController.php
│   ├── Database/
│   │   ├── Migrations/
│   │   └── Seeds/
│   ├── Filters/
│   │   └── JwtFilter.php
│   └── Models/
│       ├── UserModel.php
│       ├── CategoryModel.php
│       ├── BookModel.php
│       └── BorrowingModel.php
├── public/
├── writable/
├── vendor/
├── .env
├── composer.json
└── spark
```

---

## 4. Alur Kerja Backend

```text
Postman / Frontend
        ↓
Route API
        ↓
Filter JWT
        ↓
Controller API
        ↓
Model
        ↓
Database
        ↓
Response JSON
```

Penjelasan:

1. Frontend atau Postman mengirim request ke endpoint API.
2. Route CI4 menerima request.
3. Jika endpoint dilindungi, request diperiksa oleh `JwtFilter`.
4. Jika token valid, request diteruskan ke controller.
5. Controller memproses data menggunakan model.
6. Model mengambil atau mengubah data di database.
7. Controller mengirim response JSON.

---

## 5. Konsep JWT pada Sistem

JWT digunakan sebagai **kartu akses digital**.

Alurnya:

```text
User login
↓
Backend mengecek email dan password
↓
Jika benar, backend membuat JWT token
↓
Token dikirim ke frontend/Postman
↓
Token dipakai untuk mengakses endpoint protected
↓
Backend mengecek token melalui JwtFilter
↓
Jika token valid, request boleh diproses
```

Format pengiriman token:

```text
Authorization: Bearer TOKEN_JWT
```

Contoh:

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 6. Konfigurasi JWT

Library JWT diinstall menggunakan Composer:

```bash
composer require firebase/php-jwt
```

Pada file `.env`, ditambahkan konfigurasi:

```env
JWT_SECRET = sistem_manajemen_buku_digital_secret_key
JWT_EXPIRED_TIME = 3600
```

Keterangan:

| Konfigurasi | Fungsi |
|---|---|
| `JWT_SECRET` | Kunci rahasia untuk membuat dan memvalidasi token |
| `JWT_EXPIRED_TIME` | Masa berlaku token dalam detik |
| `3600` | Token berlaku selama 1 jam |

---

## 7. Model Backend

| Model | Tabel | Fungsi |
|---|---|---|
| `UserModel.php` | `users` | Mengelola data admin dan member |
| `CategoryModel.php` | `categories` | Mengelola data kategori buku |
| `BookModel.php` | `books` | Mengelola data buku digital dan buku fisik |
| `BorrowingModel.php` | `borrowings` | Mengelola data peminjaman buku |

---

## 8. Controller Backend

| Controller | Fungsi |
|---|---|
| `AuthController.php` | Register, login, dan membuat JWT token |
| `CategoryController.php` | CRUD kategori buku |
| `BookController.php` | CRUD buku digital dan buku fisik |
| `BorrowingController.php` | Pengajuan, persetujuan, penolakan, dan pengembalian buku |

---

## 9. Filter JWT

File filter JWT:

```text
app/Filters/JwtFilter.php
```

Fungsi `JwtFilter`:

1. Mengecek apakah request membawa header `Authorization`.
2. Mengecek format token `Bearer Token`.
3. Melakukan decode JWT.
4. Menolak request jika token tidak ada, salah, atau expired.
5. Mengizinkan request jika token valid.

Filter JWT didaftarkan pada file:

```text
app/Config/Filters.php
```

Alias filter:

```php
'jwt' => \App\Filters\JwtFilter::class,
```

---

## 10. Routes API

Routes API ditulis pada file:

```text
app/Config/Routes.php
```

Routes dibagi menjadi dua bagian:

```text
1. Public API
2. Protected API
```

### 10.1 Public API

Endpoint public dapat diakses tanpa token.

```text
POST /api/register
POST /api/login
GET  /api/categories
GET  /api/categories/{id}
GET  /api/books
GET  /api/books/ebooks
GET  /api/books/physical
GET  /api/books/{id}
```

### 10.2 Protected API

Endpoint protected wajib menggunakan JWT token.

```text
GET    /api/borrowings
GET    /api/borrowings/{id}
GET    /api/my-borrowings
POST   /api/categories
POST   /api/books
POST   /api/borrowings
PUT    /api/categories/{id}
PUT    /api/books/{id}
PUT    /api/borrowings/{id}/approve
PUT    /api/borrowings/{id}/reject
PUT    /api/borrowings/{id}/return
DELETE /api/categories/{id}
DELETE /api/books/{id}
```

---

## 11. Base URL API

```text
http://localhost:8080/api
```

---

## 12. Auth API

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| POST | `/register` | Public | Register member baru |
| POST | `/login` | Public | Login user dan menghasilkan JWT token |

### 12.1 Register Member

```http
POST http://localhost:8080/api/register
```

Body JSON:

```json
{
  "name": "Member Tiga",
  "email": "member3@example.com",
  "password": "member123"
}
```

Contoh response:

```json
{
  "status": true,
  "message": "Register berhasil",
  "data": {
    "id": 4,
    "name": "Member Tiga",
    "email": "member3@example.com",
    "role": "member"
  }
}
```

### 12.2 Login Member/Admin

```http
POST http://localhost:8080/api/login
```

Body JSON:

```json
{
  "email": "member3@example.com",
  "password": "member123"
}
```

Contoh response:

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

Catatan:

Endpoint login menggunakan `No Auth` di Postman, karena token baru diperoleh setelah login berhasil.

---

## 13. Category API

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| GET | `/categories` | Public | Menampilkan semua kategori |
| GET | `/categories/{id}` | Public | Menampilkan detail kategori |
| POST | `/categories` | Protected | Menambahkan kategori |
| PUT | `/categories/{id}` | Protected | Mengubah kategori |
| DELETE | `/categories/{id}` | Protected | Menghapus kategori |

### Contoh Create Category

```http
POST http://localhost:8080/api/categories
```

Authorization:

```text
Bearer Token Admin
```

Body JSON:

```json
{
  "name": "Bahasa",
  "slug": "bahasa",
  "description": "Kategori buku bahasa"
}
```

Catatan:

Kategori yang masih digunakan oleh data buku tidak dapat dihapus karena masih memiliki relasi dengan tabel `books`.

---

## 14. Book API

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| GET | `/books` | Public | Menampilkan semua buku |
| GET | `/books/ebooks` | Public | Menampilkan semua e-book |
| GET | `/books/physical` | Public | Menampilkan semua buku fisik |
| GET | `/books/{id}` | Public | Menampilkan detail buku |
| POST | `/books` | Protected | Menambahkan buku |
| PUT | `/books/{id}` | Protected | Mengubah buku |
| DELETE | `/books/{id}` | Protected | Menghapus buku |

### 14.1 Contoh Create E-book

```http
POST http://localhost:8080/api/books
```

Authorization:

```text
Bearer Token Admin
```

Body JSON:

```json
{
  "category_id": 1,
  "title": "Belajar REST API CodeIgniter 4",
  "slug": "belajar-rest-api-codeigniter-4",
  "author": "Rina Maharani",
  "publisher": "Tekno Media",
  "publication_year": 2026,
  "isbn": "978-6666666666",
  "description": "Buku digital tentang pembuatan REST API menggunakan CodeIgniter 4.",
  "type": "ebook",
  "cover_image": "covers/rest-api-ci4.jpg",
  "pdf_file": "pdf/rest-api-ci4.pdf",
  "stock_total": 0,
  "stock_available": 0
}
```

### 14.2 Contoh Create Buku Fisik

```http
POST http://localhost:8080/api/books
```

Authorization:

```text
Bearer Token Admin
```

Body JSON:

```json
{
  "category_id": 2,
  "title": "Manajemen Perpustakaan Sekolah",
  "slug": "manajemen-perpustakaan-sekolah",
  "author": "Dian Safitri",
  "publisher": "Edu Press",
  "publication_year": 2025,
  "isbn": "978-7777777777",
  "description": "Buku fisik tentang manajemen perpustakaan sekolah.",
  "type": "physical",
  "cover_image": "covers/manajemen-perpustakaan.jpg",
  "pdf_file": null,
  "stock_total": 4,
  "stock_available": 4
}
```

Aturan buku:

1. Jika `type = ebook`, maka `pdf_file` wajib ada.
2. Jika `type = physical`, maka `pdf_file` bernilai `null`.
3. Buku fisik harus memiliki stok lebih dari 0.
4. Buku digital tidak dapat dipinjam, tetapi dapat dibaca melalui PDF.

---

## 15. Borrowing API

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| GET | `/borrowings` | Admin | Menampilkan semua data peminjaman |
| GET | `/borrowings/{id}` | Admin/member terkait | Menampilkan detail peminjaman |
| GET | `/my-borrowings` | Member | Menampilkan riwayat peminjaman member yang sedang login |
| POST | `/borrowings` | Member | Mengajukan peminjaman buku |
| PUT | `/borrowings/{id}/approve` | Admin | Menyetujui peminjaman |
| PUT | `/borrowings/{id}/reject` | Admin | Menolak peminjaman |
| PUT | `/borrowings/{id}/return` | Admin | Menandai buku sudah dikembalikan |

---

### 15.1 Perubahan Borrowing Setelah Menggunakan JWT

Sebelum JWT, endpoint riwayat peminjaman menggunakan:

```text
GET /api/my-borrowings/{user_id}
```

Setelah JWT, berubah menjadi:

```text
GET /api/my-borrowings
```

Karena `user_id` diambil otomatis dari token.

Sebelum JWT, body create borrowing:

```json
{
  "user_id": 4,
  "book_id": 2,
  "borrow_date": "2026-07-01",
  "due_date": "2026-07-08"
}
```

Setelah JWT, body create borrowing:

```json
{
  "book_id": 2,
  "borrow_date": "2026-07-01",
  "due_date": "2026-07-08"
}
```

`user_id` tidak perlu dikirim karena backend mengambil identitas user dari token.

---

### 15.2 Contoh Get My Borrowings

```http
GET http://localhost:8080/api/my-borrowings
```

Authorization:

```text
Bearer Token Member
```

Body:

```text
Kosong
```

---

### 15.3 Contoh Create Borrowing

```http
POST http://localhost:8080/api/borrowings
```

Authorization:

```text
Bearer Token Member
```

Body JSON:

```json
{
  "book_id": 2,
  "borrow_date": "2026-07-01",
  "due_date": "2026-07-08"
}
```

Contoh response:

```json
{
  "status": true,
  "message": "Pengajuan peminjaman berhasil dibuat",
  "data": {
    "id": 5,
    "user_id": 4,
    "book_id": 2,
    "borrow_date": "2026-07-01",
    "due_date": "2026-07-08",
    "return_date": null,
    "status": "pending"
  }
}
```

Perhatikan bahwa `user_id` otomatis berasal dari JWT token.

---

### 15.4 Contoh Approve Borrowing

```http
PUT http://localhost:8080/api/borrowings/5/approve
```

Authorization:

```text
Bearer Token Admin
```

Body:

```text
Kosong
```

Jika berhasil, status peminjaman berubah dari `pending` menjadi `approved`, dan stok buku fisik berkurang 1.

---

### 15.5 Contoh Reject Borrowing

```http
PUT http://localhost:8080/api/borrowings/5/reject
```

Authorization:

```text
Bearer Token Admin
```

Body:

```text
Kosong
```

Reject hanya dapat dilakukan pada peminjaman dengan status `pending`.

---

### 15.6 Contoh Return Borrowing

```http
PUT http://localhost:8080/api/borrowings/5/return
```

Authorization:

```text
Bearer Token Admin
```

Body:

```text
Kosong
```

Return hanya dapat dilakukan pada peminjaman dengan status `approved`.

Jika berhasil, status berubah menjadi `returned` dan stok buku fisik bertambah 1.

---

## 16. Role dan Hak Akses

Sistem memiliki dua role:

```text
admin
member
```

### 16.1 Hak Akses Admin

Admin dapat:

1. Login.
2. Mengelola kategori.
3. Mengelola data buku.
4. Melihat semua data peminjaman.
5. Menyetujui peminjaman.
6. Menolak peminjaman.
7. Menandai buku sudah dikembalikan.

### 16.2 Hak Akses Member

Member dapat:

1. Register.
2. Login.
3. Melihat katalog buku.
4. Melihat detail buku.
5. Membaca e-book.
6. Mengajukan peminjaman buku fisik.
7. Melihat riwayat peminjaman miliknya sendiri.

---

## 17. Format Response JSON

Response sukses:

```json
{
  "status": true,
  "message": "Data berhasil diambil",
  "data": []
}
```

Response sukses login:

```json
{
  "status": true,
  "message": "Login berhasil",
  "token": "TOKEN_JWT",
  "data": {
    "id": 1,
    "name": "Admin Perpustakaan",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

Response token tidak ditemukan:

```json
{
  "status": false,
  "message": "Token tidak ditemukan"
}
```

Response token tidak valid:

```json
{
  "status": false,
  "message": "Token tidak valid atau sudah expired"
}
```

Response akses ditolak:

```json
{
  "status": false,
  "message": "Akses ditolak. Hanya admin yang dapat melakukan aksi ini."
}
```

---

## 18. Testing API Menggunakan Postman

Postman digunakan untuk menguji endpoint API dan membuat dokumentasi API.

Struktur collection:

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

## 19. Alur Testing JWT di Postman

### 19.1 Login Member

```text
POST http://localhost:8080/api/login
Authorization: No Auth
```

Body:

```json
{
  "email": "member3@example.com",
  "password": "member123"
}
```

Copy token dari response.

### 19.2 Test Endpoint Member

Gunakan token member untuk:

```text
GET  /api/my-borrowings
POST /api/borrowings
```

Di Postman:

```text
Authorization → Type: Bearer Token → Paste token member
```

### 19.3 Login Admin

```text
POST http://localhost:8080/api/login
Authorization: No Auth
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Copy token dari response.

### 19.4 Test Endpoint Admin

Gunakan token admin untuk:

```text
GET  /api/borrowings
PUT  /api/borrowings/{id}/approve
PUT  /api/borrowings/{id}/reject
PUT  /api/borrowings/{id}/return
POST /api/categories
POST /api/books
```

Di Postman:

```text
Authorization → Type: Bearer Token → Paste token admin
```

---

## 20. File Postman Collection

Setelah semua request berhasil dites, collection diexport dari Postman dan disimpan pada folder:

```text
docs/Sistem-Manajemen-Buku-Digital.postman_collection.json
```

---

## 21. Cara Menjalankan Backend

Masuk ke folder backend:

```bash
cd backend
```

Jalankan server CodeIgniter 4:

```bash
php spark serve
```

Backend berjalan pada:

```text
http://localhost:8080
```

---

## 22. Cara Menjalankan Migration dan Seeder

Jalankan migration:

```bash
php spark migrate
```

Jalankan seeder:

```bash
php spark db:seed UserSeeder
php spark db:seed CategorySeeder
php spark db:seed BookSeeder
php spark db:seed BorrowingSeeder
```

Urutan seeder:

```text
1. UserSeeder
2. CategorySeeder
3. BookSeeder
4. BorrowingSeeder
```

---

## 23. Akun Dummy

### Admin

```text
Email    : admin@example.com
Password : admin123
Role     : admin
```

### Member

```text
Email    : member@example.com
Password : member123
Role     : member
```

Contoh member hasil register:

```text
Email    : member3@example.com
Password : member123
Role     : member
```

---

## 24. Catatan Error Umum

### 24.1 404 Not Found

Penyebab umum:

1. Route belum ditulis di `Routes.php`.
2. Method HTTP salah.
3. Endpoint salah.
4. Controller atau namespace salah.

Contoh:

`/api/register` harus dites dengan method `POST`, bukan `GET`.

### 24.2 400 Bad Request

Penyebab umum:

1. Body JSON tidak lengkap.
2. Field wajib tidak dikirim.
3. Format JSON salah.
4. Header `Content-Type: application/json` belum aktif.

### 24.3 401 Unauthorized

Penyebab umum:

1. Token tidak dikirim.
2. Format token salah.
3. Token sudah expired.
4. Secret key JWT tidak sesuai.

### 24.4 403 Forbidden

Penyebab umum:

1. Role user tidak sesuai.
2. Member mencoba mengakses fitur admin.
3. User mencoba melihat data peminjaman milik user lain.

### 24.5 500 Internal Server Error

Penyebab umum:

1. Error pada kode controller.
2. Nama kolom database salah.
3. Foreign key constraint.
4. Data relasi masih digunakan.
5. Konfigurasi `.env` belum sesuai.

---

## 25. Checklist Backend Developer

```text
[x] Membuat database dan tabel
[x] Membuat migration
[x] Membuat seeder
[x] Membuat UserModel
[x] Membuat CategoryModel
[x] Membuat BookModel
[x] Membuat BorrowingModel
[x] Membuat AuthController
[x] Membuat CategoryController
[x] Membuat BookController
[x] Membuat BorrowingController
[x] Install library JWT
[x] Menambahkan konfigurasi JWT di .env
[x] Membuat JwtFilter
[x] Mendaftarkan filter jwt di Filters.php
[x] Memisahkan public route dan protected route
[x] Login menghasilkan JWT token
[x] Endpoint protected wajib menggunakan Bearer Token
[x] Testing register
[x] Testing login member
[x] Testing login admin
[x] Testing endpoint public
[x] Testing endpoint protected tanpa token
[x] Testing endpoint protected dengan token member
[x] Testing endpoint protected dengan token admin
[x] Testing create borrowing tanpa user_id
[x] Testing approve/reject/return borrowing dengan token admin
[x] Menyimpan request di Postman
[x] Export Postman Collection
```

---

## 26. Kesimpulan

Backend Sistem Manajemen Buku Digital dibangun menggunakan CodeIgniter 4 sebagai REST API. Backend menyediakan endpoint untuk autentikasi, kategori, buku, dan peminjaman.

Sistem menggunakan JWT sebagai autentikasi API. Setelah login berhasil, backend mengirim token kepada user. Token tersebut digunakan untuk mengakses endpoint yang dilindungi seperti pengajuan peminjaman, pengelolaan buku, pengelolaan kategori, dan manajemen peminjaman.

Dengan JWT, sistem menjadi lebih aman karena `user_id` tidak lagi dikirim manual dari frontend, tetapi diambil langsung dari token login. Selain itu, akses admin dan member dapat dibedakan berdasarkan role yang terdapat di dalam token.
