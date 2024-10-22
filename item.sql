-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 04:27 PM
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
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `ItemID` varchar(255) NOT NULL,
  `ItemName` varchar(255) NOT NULL,
  `Price` float NOT NULL,
  `ID` varchar(255) NOT NULL,
  `ImageData` varchar(255) DEFAULT '""'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`ItemID`, `ItemName`, `Price`, `ID`, `ImageData`) VALUES
('1729586106780', 'couch', 25, '1729251063570', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/748ccce0-b4b0-486b-892a-bc172cc5feeb.jpeg'),
('1729586143048', 'face', 65, '1729251063570', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/56cfc0b6-7e1d-4554-97f9-b2fcd7a8c966.jpeg'),
('1729590197546', 'wall', 20, '1729251063570', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/82ed714e-416f-4122-9071-f7ee49df24bf.jpeg'),
('1729590409544', 'thing', 80, '1729251063570', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/0b13b52a-56e4-4936-bc60-d677286375b7.jpeg'),
('1729602825467', 'ladder', 45, '1729602335364', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/d5d7c9c2-d3e4-4b69-93ed-2c7eb9ce2297.jpeg'),
('1729602855583', 'Hat', 98, '1729602335364', 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChaole-92d8e995-ddd2-43ad-b3d5-1b1cd64d6fdb/ImagePicker/c6941e47-0796-42ea-97f1-36edfbb2aa5c.jpeg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
