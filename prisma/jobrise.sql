-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2025 at 12:34 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobrise`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `jobId` int(11) NOT NULL,
  `profileId` int(11) NOT NULL,
  `status` enum('Accepted','Screening','Rejected') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `name_user` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `userId`, `jobId`, `profileId`, `status`, `createdAt`, `name_user`) VALUES
(1, 3, 16, 25, 'Rejected', '2025-05-22 18:35:16.838', 'atung'),
(2, 4, 16, 28, 'Accepted', '2025-05-22 18:38:54.416', 'atung'),
(3, 4, 15, 28, 'Rejected', '2025-05-23 09:27:55.026', NULL),
(4, 4, 5, 28, 'Screening', '2025-05-24 03:50:18.505', 'ATUNG 3 UPDATE REAL'),
(5, 3, 5, 25, 'Screening', '2025-05-24 03:54:10.504', 'ATUNG 3 UPDATE REAL'),
(6, 3, 6, 25, 'Screening', '2025-05-24 03:56:02.082', 'ATUNG 3 AJA'),
(7, 9, 17, 29, 'Accepted', '2025-05-24 07:36:20.069', 'ATUNG 9 UPDATE REAL');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `industry` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `user_id`, `company_name`, `address`, `logo`, `website`, `industry`, `description`) VALUES
(1, 1, 'PT Bumi lncamg kuning pusaka', 'link cikande', 'PT_Bumi_lncamg_kuning_pusaka.jpg', 'www.blkp.co.id', 'Material', 'Perusahaan ini kita dapat menjalankan'),
(3, 2, 'PT.TBG', 'Cikande Banten', 'PT_TBG.jpg', 'http:hotela.com', 'Baja ringan', 'perusahaan ini bla bla bla'),
(5, 8, 'PT. TB Global Group', 'link cikande', 'PT__TB_Global_Group.png', 'www.tbg.co.id', 'Material', 'Perusahaan ini kita dapat menjalankan');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `jobId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `userId`, `jobId`, `createdAt`) VALUES
(1, 9, 17, '2025-05-24 09:06:23.123');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `company_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary_min` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary_max` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `companyId`, `company_name`, `title`, `description`, `salary_min`, `salary_max`, `location`, `job_type`, `is_active`, `company_logo`, `createdAt`) VALUES
(2, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'deactive', NULL, '2025-05-24 12:18:34.087'),
(3, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'deactive', NULL, '2025-05-24 12:18:34.087'),
(4, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'deactive', NULL, '2025-05-24 12:18:34.087'),
(5, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(6, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(7, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(8, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(9, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(10, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(11, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(12, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(13, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(14, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(15, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', NULL, '2025-05-24 12:18:34.087'),
(16, 3, 'PT.TBG', 'FullStack Developer mantapp PT 088', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', 'PT_TBG.jpg', '2025-05-24 12:18:34.087'),
(17, 5, 'PT. TB Global Group', 'FullStack Developer Terbaru', 'ini description FullStack', '4 juta', '6 juta', 'Jakarta timur', 'Full-Time', 'active', 'PT__TB_Global_Group.png', '2025-05-24 07:19:59.136');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkedin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `portofolio_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `username`, `email`, `full_name`, `age`, `address`, `image`, `phone`, `bio`, `linkedin`, `portofolio_url`, `city`) VALUES
(25, 3, 'atungmessi', 'atung3@gmail.com', 'ATUNG 3 AJA', '29', 'linkk kebaharan lopang indah', 'atungmessi.jpg', '08815665834', 'BIOOO ada di sini BARU', 'https://linkedinUPDATE.com', 'https://portofolioUPDATE.com', ''),
(28, 4, 'Atung 4 gaes', 'atung4@gmail.com', 'ATUNG 3 UPDATE REAL', '29', 'linkk kebaharan lopang indah', 'Atung_4_gaes.jpg', '08815665834', 'BIOOO ada di sini BARU', 'https://linkedinUPDATE.com', 'https://portofolioUPDATE.com', 'jakarta'),
(29, 9, 'Atung 9 gaes', 'atung9@gmail.com', 'ATUNG 9 UPDATE REAL', '29', 'linkk kebaharan lopang indah', 'Atung_9_gaes.jpg', '08815665834', 'BIOOO ada di sini BARU', 'https://linkedinUPDATE.com', 'https://portofolioUPDATE.com', 'jakarta');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `confirm_password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `role` enum('user','company') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updateAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `confirm_password`, `email_verified`, `otp`, `role`, `createdAt`, `updateAt`) VALUES
(1, 'BLKP', 'atung20@gmail.com', '$2a$10$kmZFMRwS3gm8vgcuWcyrZ.Ih36bJBmKuR6ZgrliygOK74iUyCm3Re', '$2a$10$kmZFMRwS3gm8vgcuWcyrZ.Ih36bJBmKuR6ZgrliygOK74iUyCm3Re', 'no', '', 'company', '2025-05-21 02:46:58.654', '2025-05-21 02:46:58.654'),
(2, 'TBG', 'atung30@gmail.com', '$2a$10$4Py2SJrCtpRmGB38KsfVFOQDuXqzGdg10HJUhXuMM3F2ypos3hVhi', '$2a$10$4Py2SJrCtpRmGB38KsfVFOQDuXqzGdg10HJUhXuMM3F2ypos3hVhi', 'no', '', 'company', '2025-05-21 02:47:22.590', '2025-05-21 02:47:22.590'),
(3, 'atung', 'atung3@gmail.com', '$2a$10$mJU14AV7meCX/ZqXuakPvuNl1Q/wMwVyqfivw1oL70Dcomtfa8yAS', '$2a$10$mJU14AV7meCX/ZqXuakPvuNl1Q/wMwVyqfivw1oL70Dcomtfa8yAS', 'no', '', 'user', '2025-05-21 03:37:15.427', '2025-05-21 03:37:15.427'),
(4, 'atung', 'atung4@gmail.com', '$2a$10$qkIDEqtM6mtCG4g5kIqsVekxYfARY2lpmSrgM6Kn.cso3zfXz2X4O', '$2a$10$qkIDEqtM6mtCG4g5kIqsVekxYfARY2lpmSrgM6Kn.cso3zfXz2X4O', 'no', '', 'user', '2025-05-21 14:25:19.913', '2025-05-21 14:25:19.913'),
(8, 'TB Global Group', 'atung80@gmail.com', '$2a$10$Lu.o.Gxr9tTdwzdbfnEX8.6cxF2ORcq.NPGibf1gBlXwb2e4gOGm.', '$2a$10$Lu.o.Gxr9tTdwzdbfnEX8.6cxF2ORcq.NPGibf1gBlXwb2e4gOGm.', 'no', '', 'company', '2025-05-24 07:04:45.344', '2025-05-24 07:04:45.344'),
(9, 'atung', 'atung9@gmail.com', '$2a$10$lvfngVvOSMgF2tgr5.vxJu75DEq0fgQRxfCTCQ1YmGczmH6KmI8oy', '$2a$10$lvfngVvOSMgF2tgr5.vxJu75DEq0fgQRxfCTCQ1YmGczmH6KmI8oy', 'no', '', 'user', '2025-05-24 07:26:01.935', '2025-05-24 07:26:01.935');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applications_userId_fkey` (`userId`),
  ADD KEY `applications_jobId_fkey` (`jobId`),
  ADD KEY `applications_profileId_fkey` (`profileId`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_user_id_key` (`user_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_userId_fkey` (`userId`),
  ADD KEY `favorites_jobId_fkey` (`jobId`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_companyId_fkey` (`companyId`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profiles_user_id_key` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `applications_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `applications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
