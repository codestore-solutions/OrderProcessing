-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: order_processing_dev
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `storeId` varchar(36) NOT NULL,
  `productAttributeId` varchar(36) DEFAULT NULL,
  `productId` varchar(36) NOT NULL,
  `cartId` varchar(36) NOT NULL,
  `shippingAddressId` varchar(36) NOT NULL,
  `paymentId` varchar(36) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `status` varchar(45) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `updatedAt` datetime NOT NULL,
  `paymentMode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('3364e750-07a3-4632-b3c8-e6f327d767a4','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','614d9498-d0e0-48ec-be30-88010700e215','7cfb6faf-7c25-4552-9f76-04b46d68136c','95494fb5-b4f7-4a37-845c-e6c5c122c321','46c45f71-ff55-4e5b-98a7-53f25ac27ef0','588ba8e8-d9d0-4758-90b8-6ac423ac4ba6',1300,0,'pending','2023-05-29 07:02:45',2,'2023-05-29 07:02:45','credit card'),('47281faf-a2c5-4c0e-b13b-1acbbf23af45','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','614d9498-d0e0-48ec-be30-88010700e215','7cfb6faf-7c25-4552-9f76-04b46d68136c','09d70224-fe62-4988-af37-da2ed04605fc','46c45f71-ff55-4e5b-98a7-53f25ac27ef0','588ba8e8-d9d0-4758-90b8-6ac423ac4ba6',1300,0,'pending','2023-05-29 10:13:35',2,'2023-05-29 10:13:35','credit card'),('4ad181f0-d3d2-4ab2-bb13-2994ec4c1055','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','614d9498-d0e0-48ec-be30-88010700e215','7cfb6faf-7c25-4552-9f76-04b46d68136c','09d70224-fe62-4988-af37-da2ed04605fc','46c45f71-ff55-4e5b-98a7-53f25ac27ef0','588ba8e8-d9d0-4758-90b8-6ac423ac4ba6',1300,0,'pending','2023-05-29 10:13:35',2,'2023-05-29 10:13:35','credit card'),('e5230443-b1b8-4c39-a368-8f7f8433b6e3','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','614d9498-d0e0-48ec-be30-88010700e215','7cfb6faf-7c25-4552-9f76-04b46d68136c','95494fb5-b4f7-4a37-845c-e6c5c122c321','46c45f71-ff55-4e5b-98a7-53f25ac27ef0','588ba8e8-d9d0-4758-90b8-6ac423ac4ba6',1300,0,'pending','2023-05-29 07:02:45',2,'2023-05-29 07:02:45','credit card');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-29 16:05:20
