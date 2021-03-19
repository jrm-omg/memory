-- Adminer 4.8.0 MySQL 8.0.23-0ubuntu0.20.04.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `parties`;
CREATE TABLE `parties` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `p_pseudo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `p_temps` int NOT NULL,
  `p_datetime` datetime NOT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `parties` (`p_pseudo`, `p_temps`, `p_datetime`) VALUES
('john',	154,	'2020-02-15 14:13:15'),
('louis',	110,	'2021-03-18 19:20:01'),
('dr. gonzo',	163,	'2019-03-15 15:24:09'),
('marcellus',	144,	'2021-03-15 15:24:32'),
('albert',	169,	'2021-03-17 12:05:53'),
('jean-denis',	126,	'2021-03-17 15:58:52'),
('charlemagne',	666,	'1990-08-01 10:09:56');
