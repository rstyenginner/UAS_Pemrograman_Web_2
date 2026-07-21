# PEMBAGIAN TUGAS TIM

# Sistem Manajemen Buku Digital

## 1. Daftar Peran Tim

Proyek ini menggunakan 5 peran utama:

1. System Analyst / Project Manager.
2. Database Engineer.
3. Backend Developer.
4. UI/UX Designer.
5. Frontend Developer.

## 2. Pembagian Sementara

### 2.1 System Analyst / Project Manager

Penanggung jawab: "Hendra"

Tugas:

1. Menentukan tema proyek.
2. Menentukan fitur sistem.
3. Membuat dokumen SRS.
4. Membuat alur sistem.
5. Membuat use case.
6. Menentukan kebutuhan fungsional dan non-fungsional.
7. Mengatur pembagian tugas.
8. Menyiapkan logbook mingguan.
9. Mengontrol progress pengerjaan.

Output:

1. Dokumen SRS.
2. Flowchart.
3. Use case.
4. Pembagian tugas.
5. Logbook mingguan.

### 2.2 Database Engineer

Penanggung jawab: "Hendra"

Tugas:

1. Membuat ERD.
2. Menentukan tabel database.
3. Menentukan kolom setiap tabel.
4. Menentukan relasi antar tabel.
5. Membuat migration.
6. Membuat seeder data dummy.
7. Menyiapkan file SQL jika diperlukan.

Output:

1. ERD.
2. Struktur tabel database.
3. Migration database.
4. Seeder.
5. File SQL.

### 2.3 Backend Developer

Penanggung jawab: "Hendra"

Tugas:

1. Membuat backend REST API.
2. Membuat autentikasi login.
3. Membuat API kategori.
4. Membuat API buku.
5. Membuat API upload PDF.
6. Membuat API peminjaman.
7. Membuat validasi input.
8. Membuat response JSON.
9. Membuat dokumentasi Postman.

Output:

1. Source code backend.
2. REST API.
3. Postman Collection.
4. Dokumentasi API.

### 2.4 Frontend Developer

Penanggung jawab utama: "Zidan"
Pendamping: "Hendra"

Tugas:

1. Membuat tampilan website.
2. Membuat halaman login.
3. Membuat halaman register.
4. Membuat halaman katalog buku.
5. Membuat halaman detail buku.
6. Membuat halaman baca PDF.
7. Membuat halaman riwayat peminjaman.
8. Membuat halaman dashboard admin.
9. Menghubungkan frontend ke REST API.

Output:

1. Source code frontend.
2. Tampilan website interaktif.
3. Integrasi API.

### 2.5 UI/UX Designer

Penanggung jawab utama: "Muhyi"  
Pendamping: "Hendra"

Tugas:

1. Membuat wireframe.
2. Membuat desain halaman login.
3. Membuat desain katalog buku.
4. Membuat desain detail buku.
5. Membuat desain halaman baca PDF.
6. Membuat desain dashboard admin.
7. Membuat desain kelola buku.
8. Membuat desain kelola peminjaman.
9. Membuat style guide sederhana.

Output:

1. Link Figma atau desain.
2. Wireframe.
3. Style guide.
4. Asset UI.

## 3. Alur Kerja Antar Peran

System Analyst membuat alur sistem dan dokumen kebutuhan.

Database Engineer membuat struktur data berdasarkan kebutuhan sistem.

Backend Developer membuat REST API berdasarkan struktur database.

UI/UX Designer membuat tampilan berdasarkan kebutuhan sistem.

Frontend Developer membuat halaman website dan menghubungkannya ke REST API.

## 4. Handoff Antar Peran

### 4.1 Dari System Analyst ke Database Engineer

Data yang diberikan:

1. Daftar fitur sistem.
2. Aktor sistem.
3. Jenis buku.
4. Alur peminjaman.
5. Kebutuhan data.

Contoh kebutuhan data:

- Setiap buku memiliki judul, penulis, kategori, jenis buku, cover, PDF, dan stok.
- Setiap peminjaman memiliki member, buku, tanggal pinjam, tanggal kembali, dan status.

### 4.2 Dari Database Engineer ke Backend Developer

Data yang diberikan:

1. ERD.
2. Nama tabel.
3. Nama kolom.
4. Relasi tabel.
5. Migration.
6. Seeder.

### 4.3 Dari Backend Developer ke Frontend Developer

Data yang diberikan:

1. Base URL API.
2. Daftar endpoint API.
3. Method API.
4. Format request.
5. Format response JSON.
6. Token autentikasi.
7. Postman Collection.

### 4.4 Dari UI/UX Designer ke Frontend Developer

Data yang diberikan:

1. Link desain.
2. Layout halaman.
3. Warna.
4. Font.
5. Icon.
6. Asset gambar.
7. Flow halaman.

## 6. Kesepakatan Awal Tim

1. Sistem menggunakan tema Sistem Manajemen Buku Digital.
2. Role aplikasi terdiri dari Admin dan Member.
3. Jenis buku terdiri dari e-book PDF dan buku fisik.
4. E-book dapat dibaca langsung melalui file PDF.
5. Buku fisik dapat diajukan peminjaman.
6. Backend menyediakan REST API.
7. Frontend menampilkan data dari REST API.
8. Database menggunakan MySQL/MariaDB.
9. Dokumentasi API menggunakan Postman.
