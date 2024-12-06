-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 06 Des 2024 pada 12.03
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_crm`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `costumers`
--

CREATE TABLE `costumers` (
  `id` int NOT NULL,
  `msidn` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `cls` varchar(100) DEFAULT NULL,
  `bonus` decimal(10,2) DEFAULT NULL,
  `nik` varchar(20) NOT NULL,
  `kk_number` varchar(20) NOT NULL,
  `package_id` int DEFAULT NULL,
  `activate_date` date DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `alamat` text,
  `no_rumah` varchar(10) DEFAULT NULL,
  `rt` varchar(10) DEFAULT NULL,
  `rw` varchar(10) DEFAULT NULL,
  `desa_kelurahan` varchar(100) DEFAULT NULL,
  `kecamatan` varchar(100) DEFAULT NULL,
  `kota_kabupaten` varchar(100) DEFAULT NULL,
  `provinsi` varchar(100) DEFAULT NULL,
  `alamat_domisili` text,
  `kota_domisili` varchar(100) DEFAULT NULL,
  `phone_2` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `whatsapp` varchar(20) DEFAULT NULL,
  `status` enum('pending','validated','activated','success') DEFAULT 'pending',
  `current_stage` enum('agent','screener','activator','team_fu') DEFAULT 'agent',
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `costumers`
--

INSERT INTO `costumers` (`id`, `msidn`, `full_name`, `cls`, `bonus`, `nik`, `kk_number`, `package_id`, `activate_date`, `tempat_lahir`, `tgl_lahir`, `alamat`, `no_rumah`, `rt`, `rw`, `desa_kelurahan`, `kecamatan`, `kota_kabupaten`, `provinsi`, `alamat_domisili`, `kota_domisili`, `phone_2`, `email`, `whatsapp`, `status`, `current_stage`, `created_at`) VALUES
(32, '10238120401461', 'Rendani A H Hutagaol', '213231', NULL, '12120123012019371', '123009741610641', 1, '2024-12-17', 'Balige', NULL, 'Jln Kampung buarang gg melawai', '2ZB', '12', '02', 'Balige', 'Toba', 'Kota Tangerang Selatan', 'Banten', 'Jln Kampung buarang gg melawai', 'Kota Tangerang Selatan', '0895384941135', 'rendanihutagaol1234@gmail.com', '0895384941135', NULL, 'agent', NULL),
(33, '6281110001708', 'Jow', '200000', NULL, '3207901508030020', '3218368922233422', 1, '2024-12-12', 'TANGERANG', NULL, 'VANYA PARK BLOK A1/25 KEL. CISAUK KEC. CISAUK', '24', '2', '3', 'CISAUK', 'CISAUK', 'TANGERANG', 'BANTEN', 'VANYA PARK', 'TANGERANG', '081241429147', 'donpablow@gmail.com', '082141516826', NULL, 'agent', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `costumers_activated`
--

CREATE TABLE `costumers_activated` (
  `id` int NOT NULL,
  `costumer_id` int DEFAULT NULL,
  `activated_id` int DEFAULT NULL,
  `activation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','success','failed') DEFAULT 'pending',
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_pending`
--

CREATE TABLE `data_pending` (
  `id` int NOT NULL,
  `costumer_id` int DEFAULT NULL,
  `missing_field` text,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `packages`
--

CREATE TABLE `packages` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `data_size` int NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `packages`
--

INSERT INTO `packages` (`id`, `name`, `data_size`, `price`) VALUES
(1, 'Paket Hemat Rumah Tangga', 100, 150000.00);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pending`
--

CREATE TABLE `pending` (
  `id` int NOT NULL,
  `msidn` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `cls` varchar(255) DEFAULT NULL,
  `bonus` int DEFAULT NULL,
  `nik` varchar(255) DEFAULT NULL,
  `kk_number` varchar(255) DEFAULT NULL,
  `package_id` varchar(255) DEFAULT NULL,
  `activate_date` date DEFAULT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `alamat` text,
  `no_rumah` varchar(255) DEFAULT NULL,
  `rt` varchar(255) DEFAULT NULL,
  `rw` varchar(255) DEFAULT NULL,
  `desa_kelurahan` varchar(255) DEFAULT NULL,
  `kecamatan` varchar(255) DEFAULT NULL,
  `kota_kabupaten` varchar(255) DEFAULT NULL,
  `provinsi` varchar(255) DEFAULT NULL,
  `alamat_domisili` text,
  `kota_domisili` varchar(255) DEFAULT NULL,
  `phone_2` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `status` enum('active','pending') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `pending`
--

INSERT INTO `pending` (`id`, `msidn`, `full_name`, `cls`, `bonus`, `nik`, `kk_number`, `package_id`, `activate_date`, `tempat_lahir`, `tgl_lahir`, `alamat`, `no_rumah`, `rt`, `rw`, `desa_kelurahan`, `kecamatan`, `kota_kabupaten`, `provinsi`, `alamat_domisili`, `kota_domisili`, `phone_2`, `email`, `whatsapp`, `status`) VALUES
(26, '1231231', 'Vonda Mitzhuco', '12412412', NULL, '141241', '141241241', '1', NULL, NULL, NULL, 'Serpong', NULL, NULL, NULL, NULL, NULL, 'Tobasamosir', 'Sumatra Utara', NULL, NULL, NULL, NULL, NULL, 'pending');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nama_user` varchar(50) NOT NULL,
  `role` enum('leader','agent','screener','activator','team_fu') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `nama_user`, `role`, `created_at`, `last_login`) VALUES
(6, 'sc_1', '$2b$10$FYiFMcnCrPNtSgYjtyif3OfaiUmCV4jtLzD0./JaBNU/GII.YsQ2y', 'screner@email.com', 'Juhita Tresi', 'screener', '2024-11-22 07:33:10', NULL),
(11, 'L_1', '$2b$10$TSd5MNvpNKdm7wT8jhMyF..rQhUutDz29epX73k/IJwz9C.N1SZhi', 'leader1@gmail.com', 'rendani hutagaol', 'leader', '2024-12-06 09:25:34', NULL),
(12, 'L_2', '$2b$10$n/xCZ3pDzIZHGYK6w3RskuRQMAKPBFzMWe5exBJtJVeKC6qhcy7Ru', 'leader2@gmail.com', 'Jhordy Sachsono', 'leader', '2024-12-06 09:28:22', NULL),
(13, 'TF_2', '$2b$10$gztyxc/OMDqYaSUrALtmKOmVgO8wZnlJ.JMVf1liV1XqWYWWZDOWu', 'teamfu2@gmail.com', 'Ridho Dwicahyo', 'agent', '2024-12-06 10:08:24', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `costumers`
--
ALTER TABLE `costumers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `created_at` (`created_at`);

--
-- Indeks untuk tabel `costumers_activated`
--
ALTER TABLE `costumers_activated`
  ADD PRIMARY KEY (`id`),
  ADD KEY `costumer_id` (`costumer_id`),
  ADD KEY `activated_id` (`activated_id`);

--
-- Indeks untuk tabel `data_pending`
--
ALTER TABLE `data_pending`
  ADD PRIMARY KEY (`id`),
  ADD KEY `costumer_id` (`costumer_id`);

--
-- Indeks untuk tabel `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pending`
--
ALTER TABLE `pending`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `costumers`
--
ALTER TABLE `costumers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT untuk tabel `costumers_activated`
--
ALTER TABLE `costumers_activated`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `data_pending`
--
ALTER TABLE `data_pending`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `pending`
--
ALTER TABLE `pending`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `costumers`
--
ALTER TABLE `costumers`
  ADD CONSTRAINT `costumers_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`);

--
-- Ketidakleluasaan untuk tabel `costumers_activated`
--
ALTER TABLE `costumers_activated`
  ADD CONSTRAINT `costumers_activated_ibfk_1` FOREIGN KEY (`costumer_id`) REFERENCES `costumers` (`id`),
  ADD CONSTRAINT `costumers_activated_ibfk_2` FOREIGN KEY (`activated_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `data_pending`
--
ALTER TABLE `data_pending`
  ADD CONSTRAINT `data_pending_ibfk_1` FOREIGN KEY (`costumer_id`) REFERENCES `costumers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
