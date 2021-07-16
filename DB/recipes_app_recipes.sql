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
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `recipeId` int NOT NULL AUTO_INCREMENT,
  `UseruserId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `steps` text,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  `approval` tinyint(1) NOT NULL DEFAULT '0',
  `aprovedBy` int DEFAULT NULL,
  `dateOfApproval` datetime DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`recipeId`),
  UNIQUE KEY `recipeId` (`recipeId`),
  KEY `FKRecipe250593` (`UseruserId`),
  CONSTRAINT `FKRecipe250593` FOREIGN KEY (`UseruserId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (6,3,'Bacalhau',NULL,'Cortar o bacalhau',1,1,4,'2021-07-02 12:51:33','2021-06-28 10:21:50','2021-07-15 08:23:40'),(9,4,'Bacalhau com broa',NULL,'Misturar a broa no Bacalhau',0,1,4,'2021-07-14 20:15:48','2021-07-11 18:48:46','2021-07-15 08:30:07'),(64,5,'Burguer','408e458ba7854f5df199b2eac7e29216.jpg','Grelhar o hamburguer',0,0,NULL,NULL,'2021-07-14 22:00:23','2021-07-14 22:00:23'),(66,5,'Sande Queijo','2567922c5c7da035e0b5690ef90bbd3c.jpg','Montar o Humburguer',1,1,NULL,NULL,'2021-07-14 22:28:25','2021-07-15 08:34:12'),(67,3,'Salada','90e796226457cbdcc8d3fe3ed7695b24.jpg','Misturar os ingredientes',1,1,4,'2021-07-15 09:39:27','2021-07-15 08:28:51','2021-07-15 08:39:27'),(68,149,'Bolo de Chocolate','2ae8e4a807aea5b80bd5a144d37fa1cb.jpg','Por forno',1,1,4,'2021-07-15 11:05:32','2021-07-15 10:03:49','2021-07-15 10:05:32');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-16 14:03:07
