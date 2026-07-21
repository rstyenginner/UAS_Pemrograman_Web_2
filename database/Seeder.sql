-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 30, 2026 at 08:47 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digital_library_db`
--

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `category_id`, `title`, `slug`, `author`, `publisher`, `publication_year`, `isbn`, `description`, `type`, `cover_image`, `pdf_file`, `stock_total`, `stock_available`, `created_at`, `updated_at`) VALUES
(1, 1, 'Belajar CodeIgniter 4 Dasar', 'belajar-codeigniter-4-dasar', 'Ahmad Fauzi', 'Informatika Press', 2024, '978-1111111111', 'Buku digital pengantar CodeIgniter 4 untuk pemula.', 'ebook', 'covers/ci4-dasar.jpg', 'pdf/ci4-dasar.pdf', 0, 0, '2026-06-30 08:25:25', '2026-06-30 08:25:25'),
(2, 1, 'Dasar-Dasar Database MySQL', 'dasar-dasar-database-mysql', 'Siti Aminah', 'Tekno Media', 2023, '978-2222222222', 'Buku fisik tentang dasar pengelolaan database MySQL.', 'physical', 'covers/mysql-dasar.jpg', NULL, 5, 5, '2026-06-30 08:25:25', '2026-06-30 08:25:25'),
(3, 2, 'Strategi Belajar Efektif', 'strategi-belajar-efektif', 'Budi Santoso', 'Edu Press', 2022, '978-3333333333', 'E-book tentang strategi belajar efektif untuk siswa dan mahasiswa.', 'ebook', 'covers/strategi-belajar.jpg', 'pdf/strategi-belajar.pdf', 0, 0, '2026-06-30 08:25:25', '2026-06-30 08:25:25'),
(4, 3, 'Langit Senja di Perpustakaan', 'langit-senja-di-perpustakaan', 'Dewi Lestari', 'Sastra Kita', 2021, '978-4444444444', 'Novel fiksi berlatar perpustakaan sekolah.', 'physical', 'covers/langit-senja.jpg', NULL, 3, 2, '2026-06-30 08:25:25', '2026-06-30 08:25:25');

--
-- Dumping data for table `borrowings`
--

INSERT INTO `borrowings` (`id`, `user_id`, `book_id`, `borrow_date`, `due_date`, `return_date`, `status`, `note`, `created_at`, `updated_at`) VALUES
(1, 2, 2, '2026-06-30', '2026-07-07', NULL, 'pending', 'Pengajuan peminjaman buku fisik oleh member.', '2026-06-30 08:37:35', '2026-06-30 08:37:35'),
(2, 2, 4, '2026-06-30', '2026-07-07', NULL, 'approved', 'Peminjaman disetujui oleh admin.', '2026-06-30 08:37:35', '2026-06-30 08:37:35');

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Teknologi', 'teknologi', 'Kategori buku tentang teknologi dan komputer', '2026-06-30 08:25:18', '2026-06-30 08:25:18'),
(2, 'Pendidikan', 'pendidikan', 'Kategori buku tentang pendidikan', '2026-06-30 08:25:18', '2026-06-30 08:25:18'),
(3, 'Novel', 'novel', 'Kategori buku cerita dan sastra', '2026-06-30 08:25:18', '2026-06-30 08:25:18'),
(4, 'Agama', 'agama', 'Kategori buku keagamaan', '2026-06-30 08:25:18', '2026-06-30 08:25:18');

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin Perpustakaan', 'admin@example.com', '$2y$10$6HWLBS08Ki78Nmm1kZRWoOTbFTfAgFWM7AzcfUpqVyq4l8IBfMJEC', 'admin', '2026-06-30 08:25:08', '2026-06-30 08:25:08'),
(2, 'Member Satu', 'member@example.com', '$2y$10$1LxltZwhIddphdlFbskAB.xSpUynl/jPR3PFDVZFhaf.XD35Iwu7u', 'member', '2026-06-30 08:25:08', '2026-06-30 08:25:08');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
