# DOKUMEN SRS

# Sistem Manajemen Buku Digital Berbasis REST API

## 1. Pendahuluan

### 1.1 Latar Belakang

Perkembangan teknologi digital mendorong kebutuhan pengelolaan buku secara lebih modern. Buku tidak hanya tersedia dalam bentuk fisik, tetapi juga dalam bentuk digital seperti file PDF. Namun, pengelolaan buku digital dan buku fisik sering kali masih terpisah, sehingga pengguna kesulitan mengetahui buku mana yang dapat dibaca secara digital dan buku mana yang harus dipinjam secara fisik. Oleh karena itu, dibutuhkan sebuah Sistem Manajemen Buku Digital berbasis web yang dapat mengelola koleksi e-book PDF dan buku fisik dalam satu sistem. Sistem ini memungkinkan pengguna melihat katalog buku, membaca e-book PDF, serta mengajukan peminjaman untuk buku yang tidak tersedia dalam bentuk PDF. Sistem ini dibangun menggunakan konsep REST API, di mana backend bertugas menyediakan data dan logika sistem dalam bentuk JSON, sedangkan frontend bertugas menampilkan data tersebut kepada pengguna.

## 2. Tujuan Sistem

Tujuan dari sistem ini adalah:

1. Menyediakan katalog buku digital dan buku fisik.
2. Memudahkan pengguna membaca e-book dalam bentuk PDF.
3. Memudahkan pengguna mengajukan peminjaman buku fisik.
4. Membantu admin mengelola data buku, kategori, file PDF, dan stok buku.
5. Membantu admin memproses peminjaman buku.
6. Menerapkan arsitektur REST API antara backend dan frontend.

## 3. Ruang Lingkup Sistem

Sistem ini mencakup:

1. Autentikasi pengguna.
2. Pengelolaan data buku.
3. Pengelolaan kategori buku.
4. Pengelolaan file PDF e-book.
5. Katalog buku.
6. Detail buku.
7. Sistem peminjaman buku fisik.
8. Riwayat peminjaman pengguna.
9. Dashboard admin.
10. Dokumentasi API menggunakan Postman.
    Sistem ini tidak mencakup pembayaran, denda otomatis, scan barcode, dan rekomendasi buku berbasis AI pada versi awal, karena saya dan rekan tim membuat yang sederhana saja.

## 4. Aktor Sistem

Aktor dalam sistem terdiri dari:

### 4.1 Admin

Admin adalah pengguna yang memiliki hak akses untuk mengelola data sistem.
Admin dapat melakukan:

1. Login.
2. Melihat dashboard.
3. Mengelola kategori buku.
4. Mengelola data buku.
5. Mengunggah cover buku.
6. Mengunggah file PDF untuk buku digital.
7. Melihat seluruh data peminjaman.
8. Menyetujui peminjaman.
9. Menolak peminjaman.
10. Menandai buku sudah dikembalikan.
11. Logout.

### 4.2 Member

Member adalah pengguna yang menggunakan sistem untuk mencari, membaca, dan meminjam buku.
Member dapat melakukan:

1. Register.
2. Login.
3. Melihat katalog buku.
4. Mencari buku.
5. Melihat detail buku.
6. Membaca PDF untuk buku digital.
7. Mengajukan peminjaman buku fisik.
8. Melihat riwayat peminjaman sendiri.
9. Logout.

## 5. Jenis Buku

Sistem membagi buku menjadi dua jenis:

### 5.1 E-book / Buku Digital

E-book adalah buku yang memiliki file PDF. Pengguna dapat membaca buku ini secara langsung melalui sistem.
Ciri-ciri:

1. Memiliki file PDF.
2. Tidak perlu diajukan peminjaman.
3. Tombol aksi yang muncul adalah "Baca PDF".

### 5.2 Buku Fisik

Buku fisik adalah buku yang tidak memiliki file PDF. Pengguna tidak dapat membaca buku ini langsung dari sistem, tetapi dapat mengajukan peminjaman.
Ciri-ciri:

1. Tidak memiliki file PDF.
2. Memiliki stok.
3. Dapat diajukan peminjaman.
4. Tombol aksi yang muncul adalah "Pinjam Buku".

## 6. Aturan Logika Sistem

### 6.1 Aturan Buku Digital

Jika buku memiliki tipe `ebook`, maka sistem menampilkan tombol "Baca PDF".
Jika pengguna menekan tombol "Baca PDF", maka sistem akan menampilkan file PDF buku tersebut.

### 6.2 Aturan Buku Fisik

Jika buku memiliki tipe `physical`, maka sistem menampilkan tombol "Pinjam Buku".
Jika stok buku lebih dari 0, maka pengguna dapat mengajukan peminjaman.
Jika stok buku 0, maka tombol peminjaman tidak aktif dan sistem menampilkan keterangan "Stok Habis".

### 6.3 Aturan Peminjaman

Peminjaman hanya dapat dilakukan oleh member yang sudah login, dan Peminjaman hanya berlaku untuk buku fisik. Setelah member mengajukan peminjaman, status awal peminjaman adalah `pending`. Dan Admin dapat mengubah status peminjaman menjadi `approved`, `rejected`, atau `returned`.

## 7. Kebutuhan Fungsional

| Kode | Kebutuhan Fungsional
| F-01 | Sistem menyediakan fitur register untuk member.
| F-02 | Sistem menyediakan fitur login untuk admin dan member.
| F-03 | Sistem menyediakan fitur logout.
| F-04 | Sistem dapat menampilkan daftar buku.
| F-05 | Sistem dapat menampilkan detail buku.
| F-06 | Sistem dapat membedakan buku digital dan buku fisik.
| F-07 | Sistem dapat menampilkan file PDF untuk buku digital.
| F-08 | Sistem dapat menerima pengajuan peminjaman buku fisik.
| F-09 | Sistem dapat menampilkan riwayat peminjaman milik member.
| F-10 | Admin dapat mengelola data kategori.
| F-11 | Admin dapat mengelola data buku.
| F-12 | Admin dapat mengunggah file PDF untuk buku digital.
| F-13 | Admin dapat melihat semua data peminjaman.
| F-14 | Admin dapat menyetujui peminjaman.
| F-15 | Admin dapat menolak peminjaman.
| F-16 | Admin dapat menandai buku sudah dikembalikan.

## 8. Kebutuhan Non-Fungsional

| Kode | Kebutuhan Non-Fungsional
| NF-01 | Sistem menggunakan arsitektur REST API.
| NF-02 | Backend hanya mengembalikan data dalam format JSON.
| NF-03 | Frontend mengonsumsi API dari backend.
| NF-04 | Database menggunakan MySQL/MariaDB.
| NF-05 | Sistem memiliki autentikasi login.
| NF-06 | Sistem memiliki validasi input.
| NF-07 | API didokumentasikan menggunakan Postman.
| NF-08 | Sistem menggunakan Git/GitHub sebagai version control.
| NF-09 | Tampilan sistem responsif untuk desktop dan mobile.

## 9. Halaman Sistem

### 9.1 Halaman Member

1. Login.
2. Register.
3. Homepage.
4. Katalog Buku.
5. Detail Buku.
6. Baca PDF.
7. Riwayat Peminjaman.
8. Profil.

### 9.2 Halaman Admin

1. Login Admin.
2. Dashboard Admin.
3. Kelola Kategori.
4. Kelola Buku.
5. Tambah Buku.
6. Edit Buku.
7. Kelola Peminjaman.
8. Detail Peminjaman.

## 10. Rancangan Data Awal

### 10.1 Tabel Users

| Kolom | Keterangan
| id | ID pengguna
| name | Nama pengguna
| email | Email pengguna
| password | Password terenkripsi
| role | admin/member
| created_at | Waktu data dibuat
| updated_at | Waktu data diperbarui

### 10.2 Tabel Categories

| Kolom | Keterangan
| id | ID kategori
| name | Nama kategori
| created_at | Waktu data dibuat
| updated_at | Waktu data diperbarui

### 10.3 Tabel Books

| Kolom | Keterangan
| id | ID buku
| category_id | ID kategori
| title | Judul buku
| author | Penulis
| publisher | Penerbit
| year | Tahun terbit
| description | Deskripsi buku
| type | ebook/physical
| pdf_file | File PDF, boleh kosong
| cover_image | Gambar cover buku
| stock | Stok buku fisik
| created_at | Waktu data dibuat
| updated_at | Waktu data diperbarui

### 10.4 Tabel Borrowings

| Kolom | Keterangan
| id | ID peminjaman
| user_id | ID member
| book_id | ID buku
| borrow_date | Tanggal peminjaman
| due_date | Batas pengembalian
| return_date | Tanggal dikembalikan
| status | pending/approved/rejected/returned
| created_at | Waktu data dibuat
| updated_at | Waktu data diperbarui

## 11. Rancangan API Awal

### 11.1 Auth API

| Method | Endpoint | Fungsi
| POST | /api/register | Register member
| POST | /api/login | Login user
| POST | /api/logout | Logout user
| GET | /api/profile | Menampilkan profil user login

### 11.2 Category API

| Method | Endpoint | Fungsi
| GET | /api/categories | Menampilkan semua kategori
| POST | /api/categories | Menambah kategori
| PUT | /api/categories/{id} | Mengedit kategori
| DELETE | /api/categories/{id} | Menghapus kategori

### 11.3 Book API

| Method | Endpoint | Fungsi
| GET | /api/books | Menampilkan semua buku
| GET | /api/books/{id} | Menampilkan detail buku
| POST | /api/books | Menambah buku
| PUT | /api/books/{id} | Mengedit buku
| DELETE | /api/books/{id} | Menghapus buku
| GET | /api/books/ebooks | Menampilkan buku digital
| GET | /api/books/physical | Menampilkan buku fisik

### 11.4 Borrowing API

| Method | Endpoint | Fungsi
| GET | /api/borrowings | Admin melihat semua peminjaman
| GET | /api/my-borrowings | Member melihat riwayat peminjaman sendiri
| POST | /api/borrowings | Member mengajukan peminjaman
| PUT | /api/borrowings/{id}/approve | Admin menyetujui peminjaman
| PUT | /api/borrowings/{id}/reject | Admin menolak peminjaman
| PUT | /api/borrowings/{id}/return | Admin menandai buku dikembalikan

## 12. Batasan Sistem

1. Sistem hanya digunakan untuk pengelolaan buku digital dan buku fisik.
2. Buku digital hanya mendukung format PDF.
3. Peminjaman hanya berlaku untuk buku fisik.
4. Member harus login sebelum mengajukan peminjaman.
5. Admin bertanggung jawab memvalidasi peminjaman.
6. Sistem belum memiliki fitur pembayaran atau denda otomatis.

## 13. Kesimpulan

Sistem Manajemen Buku Digital dirancang untuk membantu pengelolaan koleksi buku digital dan fisik dalam satu aplikasi web. Sistem ini memiliki fitur utama berupa katalog buku, akses PDF, pengajuan peminjaman, pengelolaan buku, dan pengelolaan peminjaman. Sistem dibangun dengan pendekatan REST API agar backend dan frontend dapat bekerja secara terpisah namun tetap terintegrasi.
