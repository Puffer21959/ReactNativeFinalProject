-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 04:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database`
--

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `ImageID` varchar(255) NOT NULL,
  `ImageData` varchar(255) NOT NULL,
  `ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`ImageID`, `ImageData`, `ID`) VALUES
('testUserProfile', 'datadata', 'testUser'),
('1Profile', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/0c0b0be3-1b13-4732-b622-0bd718b370b1.jpeg', '1'),
('2Profile', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/a00aba70-df4b-40f9-a95c-5b66369c7e34.jpeg', '2'),
('1729251063570Profile', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/b87073c9-2f79-4ca4-a7eb-0d0c4d72c9e4.jpeg', '1729251063570'),
('1729251063570Shop', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/3cab1f33-48b6-4a96-a0a6-ce1b5f3bfbb0.jpeg', '1729251063570'),
('1729602335364Profile', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/c8c6f51f-3a93-4884-ac20-229bd36d1408.jpeg', '1729602335364'),
('1729602335364Shop', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/86f7d34b-82f7-41ca-8b1d-969bc720d4c1.jpeg', '1729602335364');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
