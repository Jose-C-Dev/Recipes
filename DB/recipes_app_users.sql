-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: recipes_app
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Alex','alex@gmail.com','$2b$10$8Sg86MaW.2teqOOVxE0CB.CdZmkm..dZiGnXLIrI2nlWXc6rAfVIe',0,'2021-06-24 13:34:07','2021-06-24 13:34:07'),(4,'Gabriel','gabriel@gmail.com','$2b$10$ekql2bF.bk58UMCMCZnIoe79t09axMRQIGDX2wX7gaSiPolYIgLnG',1,'2021-06-24 13:47:07','2021-06-30 14:02:36'),(5,'Jay','jay@gmail.com','$2b$10$2TgkuWMJoA8Jtm./lyAXcukjVO4OXXppyZtMxW2MDRcBs1Is9sBBO',0,'2021-06-24 14:02:20','2021-06-24 14:02:20'),(6,'Filipe','filipe@gmail.com','$2b$10$AjU/JGpMjoiy.k37WeiM8OG1hOmLQg4088Iax1RWuemVV0sKcpKMi',0,'2021-06-24 14:03:17','2021-06-24 14:03:17'),(7,'Hugo','hugo@gmail.com','$2b$10$onsSF.H75zwA7BuACgBT2OrUCuhUL8J9Uv4LCmBiFb9K6b/ENxs26',0,'2021-06-24 14:06:30','2021-06-24 14:06:30'),(8,'Joao','joao@gmail.com','$2b$10$HH46D6neD7pA/UDvYl.nCuxpZG/lVZZQnlpsMSsX6CkPFKB0b4aN2',0,'2021-06-24 14:47:58','2021-06-24 14:47:58'),(9,'Jorge','jorge@gmail.com','$2b$10$vQbvJbAyKKAhp7Tf/iFF1O0KKnRQWzNc071RUQEhMKTvC44/YJcYq',0,'2021-06-26 19:56:04','2021-06-26 19:56:04'),(11,'Carlos','carlos@gmail.com','$2b$10$4KtUPcpwqUUnF.eG2JjB6ebBjemYuh/J3hIS8DvidbCRhoSeb1s5K',0,'2021-07-06 13:19:27','2021-07-06 13:19:27'),(12,'Elza','elza@gmail.com','$2b$10$ZgrlFu/DgJhWHwoaGguh8eQiwEXXHs4v7DN.fg0ENOYjxUBU1YZKu',0,'2021-07-06 22:01:27','2021-07-06 22:01:27'),(13,'Silva','silva@gmail.com','$2b$10$ZQNC7ZPXA2Wy4W24Qeki/esUwfGkRm7AGo1g7vwe2rPd8EAEQ3ZdS',0,'2021-07-07 00:59:54','2021-07-07 00:59:54'),(15,'Tiago','tiago@gmail.com','$2b$10$s.Ow/Q8ptpmoqMdZK1vqqOW1BRbmQxOXcvjOXyzPzoBGZZJIamZ5C',0,'2021-07-07 09:27:16','2021-07-07 09:27:16'),(16,'Test','test@gmail.com','$2b$10$6ACmKrwkHeO.e/d.dKIhje/FWXlGAV5P/.9oiaJKEBZoBHn9SsMKa',0,'2021-07-07 09:28:49','2021-07-07 09:28:49'),(103,'Test2','test2@gmail.com','$2b$10$SFMp.Npl9uLe/LN2M8aymelEJuvRxZrptsEFPHaoXUJxKBcEdMGl.',0,'2021-07-07 13:58:24','2021-07-07 13:58:24'),(104,'Renato','renato@gmail.com','$2b$10$xds1.S2i1WNASXsD9yRjbOcdKsy3WSqiO91bx65WmFkM2xONjkgey',0,'2021-07-07 13:59:19','2021-07-07 13:59:19'),(136,'Test3','test3@gmail.com','$2b$10$PiJeeXzFMNuY4rw2CIibXOaStMQukDMdSui9.TprAE6hHooVoOHPG',0,'2021-07-08 09:13:32','2021-07-08 09:13:32'),(147,'Ze','ze@gmail.com','$2b$10$QFUTA9Tk173zT9oVSW7kZ.x9iORc2hu8PMRw2ndFhd4qaISO/zS3O',0,'2021-07-14 22:16:22','2021-07-14 22:16:22'),(149,'Nelson','nelson@gmail.com','$2b$10$lFG25nOk6Gg7XkdUbC2zs.2G7Gg0Ddy26HurXk8gwiDQaToxNF7aG',0,'2021-07-15 10:02:30','2021-07-15 10:02:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-16 14:03:06
