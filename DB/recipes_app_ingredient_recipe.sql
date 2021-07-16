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
-- Table structure for table `ingredient_recipe`
--

DROP TABLE IF EXISTS `ingredient_recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient_recipe` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ingredientIngredientId` int NOT NULL,
  `recipeRecipeId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `unity` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`,`ingredientIngredientId`,`recipeRecipeId`),
  UNIQUE KEY `ID` (`ID`),
  KEY `FKIngredient657597` (`ingredientIngredientId`),
  KEY `FKIngredient519925` (`recipeRecipeId`),
  CONSTRAINT `FKIngredient519925` FOREIGN KEY (`recipeRecipeId`) REFERENCES `recipes` (`recipeId`),
  CONSTRAINT `FKIngredient657597` FOREIGN KEY (`ingredientIngredientId`) REFERENCES `ingredients` (`ingredientId`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient_recipe`
--

LOCK TABLES `ingredient_recipe` WRITE;
/*!40000 ALTER TABLE `ingredient_recipe` DISABLE KEYS */;
INSERT INTO `ingredient_recipe` VALUES (5,5,6,1,NULL),(6,5,9,1,NULL),(7,6,9,1,NULL),(42,16,64,100,'g'),(43,17,64,1,'un'),(46,23,66,1,'un'),(47,24,67,100,'g'),(48,25,67,50,'g'),(49,26,68,100,'g'),(50,27,68,1,'L');
/*!40000 ALTER TABLE `ingredient_recipe` ENABLE KEYS */;
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
