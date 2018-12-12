-- MySQL dump 10.13  Distrib 5.7.22, for osx10.11 (x86_64)
--
-- Host: localhost    Database: onedoc
-- ------------------------------------------------------
-- Server version	5.6.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collaborators`
--

DROP TABLE IF EXISTS `collaborators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collaborators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `docID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `classID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `docID` (`docID`),
  KEY `userID` (`userID`),
  KEY `classID` (`classID`),
  CONSTRAINT `collaborators_ibfk_1` FOREIGN KEY (`docID`) REFERENCES `documents` (`docID`),
  CONSTRAINT `collaborators_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  CONSTRAINT `collaborators_ibfk_3` FOREIGN KEY (`classID`) REFERENCES `permissions` (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaborators`
--

LOCK TABLES `collaborators` WRITE;
/*!40000 ALTER TABLE `collaborators` DISABLE KEYS */;
INSERT INTO `collaborators` VALUES (8,2,4,1),(9,1,2,2),(10,3,1,3);
/*!40000 ALTER TABLE `collaborators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `complaints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `docID` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `issue` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `resolved` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  KEY `docID` (`docID`),
  CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`author`) REFERENCES `collaborators` (`userID`),
  CONSTRAINT `complaints_ibfk_2` FOREIGN KEY (`docID`) REFERENCES `collaborators` (`docID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,1,2,'Khristian is messing up flow yo! WTF','2018-12-12 07:14:38',0),(2,3,1,'I lost my write permission. Give it back! ','2018-12-12 07:18:02',1);
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `docID` int(11) NOT NULL AUTO_INCREMENT,
  `owner` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` blob,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `locked` enum('locked','unlocked') NOT NULL DEFAULT 'locked',
  PRIMARY KEY (`docID`),
  KEY `owner` (`owner`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,2,'My First Document','This is first document and I belong to Khristian now','2018-12-12 06:25:31','2018-12-12 06:33:21','locked'),(2,4,'My Second Document','This is second document and I belong to Chantelle now','2018-12-12 06:25:31','2018-12-12 06:32:45','locked'),(3,1,'My Third Document','This is my third document. I hate to write!','2018-12-12 06:25:31','2018-12-12 06:25:31','locked');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invites`
--

DROP TABLE IF EXISTS `invites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invites` (
  `inviteID` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(11) NOT NULL,
  `docID` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  PRIMARY KEY (`inviteID`),
  KEY `sender` (`sender`),
  KEY `docID` (`docID`),
  KEY `receiver` (`receiver`),
  CONSTRAINT `invites_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `collaborators` (`userID`),
  CONSTRAINT `invites_ibfk_2` FOREIGN KEY (`docID`) REFERENCES `collaborators` (`docID`),
  CONSTRAINT `invites_ibfk_3` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invites`
--

LOCK TABLES `invites` WRITE;
/*!40000 ALTER TABLE `invites` DISABLE KEYS */;
/*!40000 ALTER TABLE `invites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `class` tinytext NOT NULL,
  `wrt` bit(1) NOT NULL,
  `R` tinyint(1) NOT NULL,
  `complain` bit(1) NOT NULL,
  `share` bit(1) NOT NULL,
  `loc` bit(1) NOT NULL,
  `rec` bit(1) NOT NULL,
  `download` bit(1) NOT NULL,
  `comment` bit(1) NOT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'Guest','\0',1,'\0','\0','\0','\0','\0','\0'),(2,'Writer','',1,'\0','\0','\0','','\0',''),(3,'Owner','',1,'','','','','',''),(4,'Super','',1,'','','','','','');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revisions`
--

DROP TABLE IF EXISTS `revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revisions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `docID` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `type` enum('add','delete') NOT NULL,
  `revised` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `accept` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author` (`author`),
  KEY `docID` (`docID`),
  CONSTRAINT `revisions_ibfk_1` FOREIGN KEY (`author`) REFERENCES `collaborators` (`userID`),
  CONSTRAINT `revisions_ibfk_2` FOREIGN KEY (`docID`) REFERENCES `collaborators` (`docID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisions`
--

LOCK TABLES `revisions` WRITE;
/*!40000 ALTER TABLE `revisions` DISABLE KEYS */;
INSERT INTO `revisions` VALUES (1,1,2,'delete','first','2018-12-12 07:07:16',1),(2,3,1,'add','not','2018-12-12 07:08:21',0);
/*!40000 ALTER TABLE `revisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taboo`
--

DROP TABLE IF EXISTS `taboo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taboo` (
  `tabooId` int(11) NOT NULL AUTO_INCREMENT,
  `tabooWord` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tabooId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taboo`
--

LOCK TABLES `taboo` WRITE;
/*!40000 ALTER TABLE `taboo` DISABLE KEYS */;
INSERT INTO `taboo` VALUES (1,'ass'),(2,'asshole'),(3,'bastard'),(4,'crap'),(5,'Christ on a bike'),(6,'Christ on a cracker'),(7,'damn'),(8,'goddamn'),(9,'goddamnit'),(10,'hell'),(11,'shit'),(12,'holyshit'),(13,'Jesus Christ'),(14,'Jesus'),(15,'shit'),(16,'whore'),(17,'stupid'),(18,'millenials'),(19,'dummy'),(20,'Bloody Hell'),(21,'Rubbish');
/*!40000 ALTER TABLE `taboo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(60) NOT NULL,
  `type` enum('G','OU','SU') NOT NULL DEFAULT 'G',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Connie','connie@gmail.com','people123','G'),(2,'Khristian','khristian@gmail.com','people123','G'),(3,'Song','song@gmail.com','people123','G'),(4,'Chantelle','chantelle@gmail.com','people123','G');
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

-- Dump completed on 2018-12-12  9:10:37
