-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 30, 2026 at 08:28 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(220) COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `publisher` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `publication_year` int DEFAULT NULL,
  `isbn` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `type` enum('ebook','physical') COLLATE utf8mb4_general_ci NOT NULL,
  `cover_image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pdf_file` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stock_total` int NOT NULL DEFAULT '0',
  `stock_available` int NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `category_id`, `title`, `slug`, `author`, `publisher`, `publication_year`, `isbn`, `description`, `type`, `cover_image`, `pdf_file`, `stock_total`, `stock_available`, `created_at`, `updated_at`) VALUES
(1, 1, 'Belajar CodeIgniter 4 Dasar', 'belajar-codeigniter-4-dasar', 'Ahmad Fauzi', 'Informatika Press', 2024, '978-1111111111', 'Buku digital pengantar CodeIgniter 4 untuk pemula.', 'ebook', 'covers/ci4-dasar.jpg', 'pdf/ci4-dasar.pdf', 0, 0, '2026-06-30 08:25:25', '2026-06-30 08:25:25'),
(2, 1, 'Dasar-Dasar Database MySQL', 'dasar-dasar-database-mysql', 'Siti Aminah', 'Tekno Media', 2023, '978-2222222222', 'Buku fisik tentang dasar pengelolaan database MySQL.', 'physical', 'covers/mysql-dasar.jpg', NULL, 5, 5, '2026-06-30 08:25:25', '2026-06-30 08:25:25'),
(3, 2, 'Strategi Belajar Efektif', 'strategi-belajar-efektif', 'Budi Santoso', 'Edu Press', 2022, '978-3333333333', 'E-book tentang strategi belajar efektif untuk siswa dan mahasiswa.', 'ebook', 'covers/strategi-belajar.jpg', 'pdf/strategi-belajar.pdf', 0, 0, '2026-06-30 08:25:25', '2026-06-30 08:25:25'),
(4, 3, 'Langit Senja di Perpustakaan', 'langit-senja-di-perpustakaan', 'Dewi Lestari', 'Sastra Kita', 2021, '978-4444444444', 'Novel fiksi berlatar perpustakaan sekolah.', 'physical', 'covers/langit-senja.jpg', NULL, 3, 3, '2026-06-30 08:25:25', '2026-06-30 08:25:25');

-- --------------------------------------------------------

--
-- Table structure for table `borrowings`
--

CREATE TABLE `borrowings` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `book_id` bigint UNSIGNED NOT NULL,
  `borrow_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status` enum('pending','approved','rejected','returned') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `note` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Teknologi', 'teknologi', 'Kategori buku tentang teknologi dan komputer', '2026-06-30 08:25:18', '2026-06-30 08:25:18'),
(2, 'Pendidikan', 'pendidikan', 'Kategori buku tentang pendidikan', '2026-06-30 08:25:18', '2026-06-30 08:25:18'),
(3, 'Novel', 'novel', 'Kategori buku cerita dan sastra', '2026-06-30 08:25:18', '2026-06-30 08:25:18'),
(4, 'Agama', 'agama', 'Kategori buku keagamaan', '2026-06-30 08:25:18', '2026-06-30 08:25:18');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint UNSIGNED NOT NULL,
  `version` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `class` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `group` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `namespace` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `time` int NOT NULL,
  `batch` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '2026-06-30-080422', 'App\\Database\\Migrations\\CreateUsersTable', 'default', 'App', 1782807582, 1),
(2, '2026-06-30-080437', 'App\\Database\\Migrations\\CreateCategoriesTable', 'default', 'App', 1782807583, 1),
(3, '2026-06-30-080446', 'App\\Database\\Migrations\\CreateBooksTable', 'default', 'App', 1782807583, 1),
(4, '2026-06-30-080452', 'App\\Database\\Migrations\\CreateBorrowingsTable', 'default', 'App', 1782807583, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','member') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'member',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin Perpustakaan', 'admin@example.com', '$2y$10$6HWLBS08Ki78Nmm1kZRWoOTbFTfAgFWM7AzcfUpqVyq4l8IBfMJEC', 'admin', '2026-06-30 08:25:08', '2026-06-30 08:25:08'),
(2, 'Member Satu', 'member@example.com', '$2y$10$1LxltZwhIddphdlFbskAB.xSpUynl/jPR3PFDVZFhaf.XD35Iwu7u', 'member', '2026-06-30 08:25:08', '2026-06-30 08:25:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `books_category_id_foreign` (`category_id`);

--
-- Indexes for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `borrowings_user_id_foreign` (`user_id`),
  ADD KEY `borrowings_book_id_foreign` (`book_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `borrowings`
--
ALTER TABLE `borrowings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD CONSTRAINT `borrowings_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `borrowings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
