# Frontend Developer - Sistem Manajemen Buku Digital

Frontend dibuat menggunakan **React + Vite** dan terhubung dengan backend **CodeIgniter 4 REST API + JWT**.

## Fitur

- Landing page / katalog buku
- Login admin/member
- Register member
- Detail buku
- Riwayat peminjaman member
- Dashboard admin
- Kelola buku
- Kelola kategori
- Kelola peminjaman
- Integrasi JWT token

## Cara Menjalankan

Pastikan backend aktif:

```bash
cd backend
php spark serve
```

Jalankan frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan pada:

```text
http://localhost:5173
```

Backend berjalan pada:

```text
http://localhost:8080
```

## Akun Dummy

Admin:

```text
admin@example.com
admin123
```

Member:

```text
member3@example.com
member123
```

## Catatan

Token JWT disimpan pada `localStorage`. File PDF dipanggil dari backend melalui path `/pdf/nama-file.pdf`.
