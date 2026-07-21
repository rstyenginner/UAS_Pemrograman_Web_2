# Database Sistem Manajemen Buku Digital

Folder ini berisi dokumentasi dan file database untuk project **Sistem Manajemen Buku Digital Berbasis REST API**.

Database digunakan untuk menyimpan data pengguna, kategori buku, data buku digital/fisik, dan transaksi peminjaman buku fisik.

## 1. Nama Database

Nama database yang digunakan:

```sql
digital_library_db
```

## 2. Daftar Tabel

Database terdiri dari empat tabel utama:

| No  | Nama Tabel   | Fungsi                                                 |
| --- | ------------ | ------------------------------------------------------ |
| 1   | `users`      | Menyimpan data pengguna sistem, yaitu admin dan member |
| 2   | `categories` | Menyimpan data kategori buku                           |
| 3   | `books`      | Menyimpan data buku digital PDF dan buku fisik         |
| 4   | `borrowings` | Menyimpan data transaksi peminjaman buku fisik         |

## 3. Relasi Tabel

Relasi antar tabel dalam database adalah sebagai berikut:

| Relasi                  | Foreign Key                                    | Keterangan                                                  |
| ----------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| `categories` ke `books` | `books.category_id` mengacu ke `categories.id` | Satu kategori dapat memiliki banyak buku                    |
| `users` ke `borrowings` | `borrowings.user_id` mengacu ke `users.id`     | Satu user/member dapat memiliki banyak transaksi peminjaman |
| `books` ke `borrowings` | `borrowings.book_id` mengacu ke `books.id`     | Satu buku dapat memiliki banyak riwayat peminjaman          |

## 4. Struktur Folder Database

Struktur folder database yang digunakan:

```text
database/
├── gambar/
│   └── erd.png
├── schema.sql
├── seeders.sql
├── full_database.sql
└── README.md
```

Keterangan file:

| File                | Keterangan                                                   |
| ------------------- | ------------------------------------------------------------ |
| `gambar/erd.png`    | Gambar Entity Relationship Diagram                           |
| `schema.sql`        | File SQL yang berisi struktur tabel database                 |
| `seeders.sql`       | File SQL yang berisi data dummy hasil export dari seeder CI4 |
| `full_database.sql` | Backup lengkap berisi struktur tabel dan data, jika tersedia |
| `README.md`         | Dokumentasi database                                         |

## 5. Penjelasan Tabel

### 5.1 Tabel `users`

Tabel `users` digunakan untuk menyimpan data pengguna sistem.

Role pengguna terdiri dari:

1. `admin`
2. `member`

Struktur utama tabel:

| Kolom        | Keterangan                           |
| ------------ | ------------------------------------ |
| `id`         | Primary key                          |
| `name`       | Nama pengguna                        |
| `email`      | Email untuk login                    |
| `password`   | Password yang sudah dienkripsi       |
| `role`       | Role pengguna: `admin` atau `member` |
| `created_at` | Waktu data dibuat                    |
| `updated_at` | Waktu data diperbarui                |

### 5.2 Tabel `categories`

Tabel `categories` digunakan untuk menyimpan data kategori buku.

Struktur utama tabel:

| Kolom         | Keterangan                     |
| ------------- | ------------------------------ |
| `id`          | Primary key                    |
| `name`        | Nama kategori                  |
| `slug`        | Nama kategori dalam format URL |
| `description` | Deskripsi kategori             |
| `created_at`  | Waktu data dibuat              |
| `updated_at`  | Waktu data diperbarui          |

Contoh kategori:

1. Teknologi
2. Pendidikan
3. Novel
4. Agama
5. Komputer

### 5.3 Tabel `books`

Tabel `books` digunakan untuk menyimpan data buku. Buku dalam sistem dibagi menjadi dua jenis, yaitu:

1. `ebook`
2. `physical`

Struktur utama tabel:

| Kolom              | Keterangan                          |
| ------------------ | ----------------------------------- |
| `id`               | Primary key                         |
| `category_id`      | Foreign key ke tabel `categories`   |
| `title`            | Judul buku                          |
| `slug`             | Judul buku dalam format URL         |
| `author`           | Penulis buku                        |
| `publisher`        | Penerbit buku                       |
| `publication_year` | Tahun terbit buku                   |
| `isbn`             | Nomor ISBN buku                     |
| `description`      | Deskripsi buku                      |
| `type`             | Jenis buku: `ebook` atau `physical` |
| `cover_image`      | Lokasi file cover buku              |
| `pdf_file`         | Lokasi file PDF untuk buku digital  |
| `stock_total`      | Total stok buku fisik               |
| `stock_available`  | Stok buku fisik yang tersedia       |
| `created_at`       | Waktu data dibuat                   |
| `updated_at`       | Waktu data diperbarui               |

### 5.4 Tabel `borrowings`

Tabel `borrowings` digunakan untuk menyimpan data transaksi peminjaman buku fisik oleh member.

Struktur utama tabel:

| Kolom         | Keterangan                   |
| ------------- | ---------------------------- |
| `id`          | Primary key                  |
| `user_id`     | Foreign key ke tabel `users` |
| `book_id`     | Foreign key ke tabel `books` |
| `borrow_date` | Tanggal pengajuan peminjaman |
| `due_date`    | Batas tanggal pengembalian   |
| `return_date` | Tanggal buku dikembalikan    |
| `status`      | Status peminjaman            |
| `note`        | Catatan admin                |
| `created_at`  | Waktu data dibuat            |
| `updated_at`  | Waktu data diperbarui        |

## 6. Aturan Data Buku

### 6.1 Buku Bertipe `ebook`

Jika buku bertipe `ebook`, maka:

1. Kolom `pdf_file` harus berisi lokasi file PDF.
2. Kolom `stock_total` dapat bernilai 0.
3. Kolom `stock_available` dapat bernilai 0.
4. Buku tidak melalui proses peminjaman.
5. Tombol yang ditampilkan di frontend adalah **Baca PDF**.

### 6.2 Buku Bertipe `physical`

Jika buku bertipe `physical`, maka:

1. Kolom `pdf_file` bernilai `NULL`.
2. Kolom `stock_total` harus lebih dari 0.
3. Kolom `stock_available` menunjukkan jumlah stok tersedia.
4. Buku dapat diajukan peminjaman oleh member.
5. Tombol yang ditampilkan di frontend adalah **Pinjam Buku**.

## 7. Status Peminjaman

Status peminjaman terdiri dari:

| Status     | Keterangan                                   |
| ---------- | -------------------------------------------- |
| `pending`  | Peminjaman sedang menunggu persetujuan admin |
| `approved` | Peminjaman disetujui oleh admin              |
| `rejected` | Peminjaman ditolak oleh admin                |
| `returned` | Buku sudah dikembalikan                      |

Alur status peminjaman:

```text
pending → approved → returned
pending → rejected
```

## 8. Aturan Stok Buku

Aturan stok hanya berlaku untuk buku bertipe `physical`.

1. Saat peminjaman dibuat, status awal adalah `pending`.
2. Saat admin menyetujui peminjaman, status berubah menjadi `approved`.
3. Saat status berubah menjadi `approved`, `stock_available` berkurang 1.
4. Saat buku dikembalikan, status berubah menjadi `returned`.
5. Saat status berubah menjadi `returned`, `stock_available` bertambah 1.
6. Jika `stock_available` bernilai 0, member tidak dapat mengajukan peminjaman.

## 9. Implementasi di CodeIgniter 4

Database dibuat menggunakan fitur migration dan seeder CodeIgniter 4.

Lokasi migration:

```text
backend/app/Database/Migrations/
```

Lokasi seeder:

```text
backend/app/Database/Seeds/
```

Perintah menjalankan migration:

```bash
php spark migrate
```

Perintah menjalankan seeder:

```bash
php spark db:seed UserSeeder
php spark db:seed CategorySeeder
php spark db:seed BookSeeder
php spark db:seed BorrowingSeeder
```

Urutan seeder penting karena tabel `books` membutuhkan data dari `categories`, sedangkan tabel `borrowings` membutuhkan data dari `users` dan `books`.

Urutan seeder yang disarankan:

```text
1. UserSeeder
2. CategorySeeder
3. BookSeeder
4. BorrowingSeeder
```

## 10. Query Testing Relasi

### 10.1 Cek Relasi Kategori dan Buku

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

### 10.2 Cek Relasi Peminjaman

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

## 11. Catatan Export SQL

File `schema.sql` diexport dari phpMyAdmin dengan pilihan:

```text
Structure only
```

File `seeders.sql` diexport dari phpMyAdmin dengan pilihan:

```text
Data only
```

File `full_database.sql`, jika dibuat, diexport dengan pilihan:

```text
Structure and data
```

Tabel `migrations` tidak perlu dimasukkan ke dalam `schema.sql` atau `seeders.sql` karena tabel tersebut merupakan tabel internal CodeIgniter 4.

## 12. Kesimpulan

Database Sistem Manajemen Buku Digital dirancang untuk mendukung fitur utama aplikasi, yaitu pengelolaan pengguna, kategori buku, buku digital PDF, buku fisik, dan transaksi peminjaman buku fisik.

Database ini sudah dirancang berdasarkan ERD, diterapkan menggunakan migration CodeIgniter 4, diisi data dummy menggunakan seeder, dan dapat diuji melalui query relasi pada phpMyAdmin.
