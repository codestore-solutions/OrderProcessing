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
-- Table structure for table `new_orders`
--

DROP TABLE IF EXISTS `new_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_orders` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `cartId` varchar(36) NOT NULL,
  `shippingAddressId` varchar(36) DEFAULT NULL,
  `paymentId` varchar(36) DEFAULT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled','return','exchanged') NOT NULL DEFAULT 'pending',
  `paymentMode` enum('credit card','debit card','paypal','cash on delivery') NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `productAttributeId` varchar(36) DEFAULT NULL,
  `quantity` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  KEY `shippingAddressId` (`shippingAddressId`),
  KEY `paymentId` (`paymentId`),
  CONSTRAINT `new_orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `new_orders_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `new_orders_ibfk_3` FOREIGN KEY (`shippingAddressId`) REFERENCES `address` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `new_orders_ibfk_4` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_orders`
--

LOCK TABLES `new_orders` WRITE;
/*!40000 ALTER TABLE `new_orders` DISABLE KEYS */;
INSERT INTO `new_orders` VALUES ('01c014dc-7057-4cf0-9094-6a22b6c6c554','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','7cfb6faf-7c25-4552-9f76-04b46d68136c','f55be422-c868-4321-bc93-2d06c6fb3c03','46c45f71-ff55-4e5b-98a7-53f25ac27ef0','588ba8e8-d9d0-4758-90b8-6ac423ac4ba6','pending','credit card','2023-05-12 08:44:56','2023-05-12 08:44:56','614d9498-d0e0-48ec-be30-88010700e215',2),('41cd6090-230c-4ee9-88c0-ee987db17fd6','d59df754-5b58-4cd6-8927-88ca32077cb3','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','7cfb6faf-7c25-4552-9f76-04b46d68136c','60f5187f-33da-4e7f-8670-c851f6d2b518','46c45f71-ff55-4e5b-98a7-53f25ac27ef0','ae3ff2a6-5764-43f6-843f-1d87bee58a37','pending','credit card','2023-05-12 07:55:32','2023-05-12 07:55:32','614d9498-d0e0-48ec-be30-88010700e215',2),('67eefa55-c559-4cac-ad57-900da7430086','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','eb1f91cc-0b57-4fa2-ac55-8c1848bb0903','7cfb6faf-7c25-4552-9f76-04b46d68136c','f55be422-c868-4321-bc93-2d06c6fb3c03','46c45f71-ff55-4e5b-98a7-53f25ac27ef0','588ba8e8-d9d0-4758-90b8-6ac423ac4ba6','pending','credit card','2023-05-12 08:44:56','2023-05-12 08:44:56','614d9498-d0e0-48ec-be30-88010700e215',2);
/*!40000 ALTER TABLE `new_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-12 16:37:39
