-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.4.4-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for devschedule
CREATE DATABASE IF NOT EXISTS `devschedule` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `devschedule`;

-- Dumping structure for table devschedule.datauser
CREATE TABLE IF NOT EXISTS `datauser` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`id`,`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.datauser: ~0 rows (approximately)
DELETE FROM `datauser`;

-- Dumping structure for table devschedule.listtopics
CREATE TABLE IF NOT EXISTS `listtopics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.listtopics: ~0 rows (approximately)
DELETE FROM `listtopics`;

-- Dumping structure for table devschedule.log
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `modulo` varchar(255) NOT NULL,
  `accion` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `casoInterno` tinyint(1) NOT NULL DEFAULT 0,
  `informacion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`informacion`)),
  `informacionAfectada` varchar(255) DEFAULT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_log_users` (`userId`),
  CONSTRAINT `fk_log_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.log: ~0 rows (approximately)
DELETE FROM `log`;

-- Dumping structure for table devschedule.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `privilege` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_permissions_user` (`idUser`),
  CONSTRAINT `fk_permissions_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.permissions: ~0 rows (approximately)
DELETE FROM `permissions`;

-- Dumping structure for table devschedule.task
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `state` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.task: ~0 rows (approximately)
DELETE FROM `task`;

-- Dumping structure for table devschedule.taskplususer
CREATE TABLE IF NOT EXISTS `taskplususer` (
  `idUser` int(11) NOT NULL,
  `idTask` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idTask`),
  KEY `fk_taskPlusUser_task` (`idTask`),
  CONSTRAINT `fk_taskPlusUser_task` FOREIGN KEY (`idTask`) REFERENCES `task` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_taskPlusUser_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.taskplususer: ~0 rows (approximately)
DELETE FROM `taskplususer`;

-- Dumping structure for table devschedule.ticketplususer
CREATE TABLE IF NOT EXISTS `ticketplususer` (
  `idUser` int(11) NOT NULL,
  `idTicket` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idTicket`),
  KEY `fk_ticketPlusUser_ticket` (`idTicket`),
  CONSTRAINT `fk_ticketPlusUser_ticket` FOREIGN KEY (`idTicket`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ticketPlusUser_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.ticketplususer: ~0 rows (approximately)
DELETE FROM `ticketplususer`;

-- Dumping structure for table devschedule.tickets
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `state` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.tickets: ~0 rows (approximately)
DELETE FROM `tickets`;

-- Dumping structure for table devschedule.userprofile
CREATE TABLE IF NOT EXISTS `userprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `firstLastName` varchar(255) NOT NULL,
  `secondLastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `cellphone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userProfile_user` (`idUser`),
  CONSTRAINT `fk_userProfile_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.userprofile: ~0 rows (approximately)
DELETE FROM `userprofile`;

-- Dumping structure for table devschedule.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table devschedule.users: ~4 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `userName`, `password`) VALUES
	(1, 'testUser', '$2b$10$0MKo/pV9RuFuC4tD4Each.C.IlGf8sOwV8iXbng7tx5VLCMIkMFum'),
	(2, 'testUser', '$2b$10$m01CRawjUHQ.lVQxr3eDZO5VhcUPHxRnx4PxIoiyW39aSoxJprSk6'),
	(3, 'testUser', '$2b$10$QQZgBPN7N1QuHY0EzhFWK.TzIDYKOfb3NX9LNTCSZbtOn/Ak.opZK'),
	(4, 'testUser', '$2b$10$IyD9jnoiIg8zW6gcm2yer.a9weuOKZvv5B0HqOEzTQsQAIuzbux8m');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
