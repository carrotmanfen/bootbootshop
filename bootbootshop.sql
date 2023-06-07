-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2023 at 09:00 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bootbootshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `address` varchar(10000) NOT NULL,
  `contract_name` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `product_id`, `address`, `contract_name`) VALUES
(27, 4, 'take my home dalssssssssssssssss', 'kkkk'),
(28, 1, '22 ratchapruek bangramad talingchan bangkok 10170', 'fen'),
(29, 5, 'Kmutt thailand', 'fen'),
(30, 1, 'sawaddeee kub', 'hello'),
(31, 2, 'easdasdasd', 'hello');

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `cost` double NOT NULL,
  `color` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`id`, `quantity`, `size`, `name`, `description`, `cost`, `color`, `picture`) VALUES
(1, 132, 10, 'Nike air force one', 'Nice sneaker', 0.00001, 'black', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6c09766f-2214-4311-bc26-810109b1dcdf/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-air-force-1-low-10-slam-jam-d81K5r.png'),
(2, 98, 10, 'Nike air jordan', 'Nice sneaker', 0.00001, 'white', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/57558712-5ebe-4abb-9984-879f9e896b4c/รองเท้าผู้-air-force-1-07-flyease-lpjTWM.png'),
(3, 99, 11, 'Nike Dunk High Retro Premium', 'ฮิปฮอปถือกำเนิดขึ้นมา 50 ปี และยังคงมีอิทธิพลต่อสตรีทแวร์จนถึงวันนี้ รองเท้า Nike เป็นส่วนสำคัญของวัฒนธรรมนี้มาโดยตลอด', 0.00001, 'Smoke Grey', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1853308a-2d38-43c2-b978-05a18e6ec40d/รองเท้าผู้-dunk-high-retro-premium-c4lpG4.png'),
(4, 169, 7, 'Nike Air Max 90', 'สวมรองเท้าแล้วสัมผัสตำนาน รองเท้าวิ่งที่เป็นที่สุดคู่นี้เกิดขึ้น ณ จุดตัดระหว่างศิลปะ ดนตรี กับวัฒนธรรม และยังเป็นหนึ่งในต้นกำเนิดของสไตล์ยุค 90 ด้วย', 0.00001, 'Action Grape', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f64a8cb2-376d-4e9f-b075-6d15577420f7/รองเท้าผู้-air-max-90-kRsBnD.png'),
(5, 89, 13, 'Air Jordan 1 Low FlyEase', 'ถอดได้สบายๆ ออกข้างนอกได้รวดเร็วกว่าที่เคยด้วยการมีแค่สายรัดกับซิป', 0.00001, 'Gym Red', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9259e44d-8e6a-4253-aefa-7db9720ea2b4/รองเท้าผู้ใส่-ถอดง่าย-air-jordan-1-low-flyease-SsT4HK.png'),
(6, 120, 6, 'Nike Dunk Low Next Nature', 'รองเท้าบาสรุ่นไอคอนคู่นี้ผลิตมาอย่างพิถีพิถันด้วยหนังสังเคราะห์ทนทาน ใส่ได้ลงตัวทั้งในสนามเด็กเล่นและในห้องเรียน', 0.00001, 'Blue Whisper', 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/cd981f23-b4d4-401a-99ef-0deb96efa32b/รองเท้า-dunk-low-next-nature-F3xNXK.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
