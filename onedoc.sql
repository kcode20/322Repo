-- MySQL dump 10.13  Distrib 5.5.62, for debian-linux-gnu (x86_64)
--
-- Host: 35.202.162.146    Database: onedocapp
-- ------------------------------------------------------
-- Server version	5.7.14-google-log

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
-- Table structure for table `Collaborators`
--

DROP TABLE IF EXISTS `Collaborators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Collaborators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `docID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `classID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `docID` (`docID`),
  KEY `userID` (`userID`),
  KEY `classID` (`classID`),
  CONSTRAINT `Collaborators_ibfk_1` FOREIGN KEY (`docID`) REFERENCES `Documents` (`docID`),
  CONSTRAINT `Collaborators_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `Users` (`id`),
  CONSTRAINT `Collaborators_ibfk_3` FOREIGN KEY (`classID`) REFERENCES `Permissions` (`classID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Collaborators`
--

LOCK TABLES `Collaborators` WRITE;
/*!40000 ALTER TABLE `Collaborators` DISABLE KEYS */;
/*!40000 ALTER TABLE `Collaborators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Complaints`
--

DROP TABLE IF EXISTS `Complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Complaints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `docID` int(11) NOT NULL,
  `Author` int(11) NOT NULL,
  `Issue` varchar(60) NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Resolved` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Author` (`Author`),
  KEY `docID` (`docID`),
  CONSTRAINT `Complaints_ibfk_1` FOREIGN KEY (`Author`) REFERENCES `Collaborators` (`userID`),
  CONSTRAINT `Complaints_ibfk_2` FOREIGN KEY (`docID`) REFERENCES `Collaborators` (`docID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Complaints`
--

LOCK TABLES `Complaints` WRITE;
/*!40000 ALTER TABLE `Complaints` DISABLE KEYS */;
/*!40000 ALTER TABLE `Complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Documents` (
  `docID` int(11) NOT NULL AUTO_INCREMENT,
  `Owner` int(11) NOT NULL,
  `Title` varchar(45) NOT NULL,
  `Content` blob,
  `Created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Locked` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`docID`),
  KEY `Owner` (`Owner`),
  CONSTRAINT `Documents_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documents`
--

LOCK TABLES `Documents` WRITE;
/*!40000 ALTER TABLE `Documents` DISABLE KEYS */;
INSERT INTO `Documents` VALUES (1,1,'Software Engineering','Wow!, I love this class','2018-12-12 01:45:19','2018-12-12 01:46:07',1);
/*!40000 ALTER TABLE `Documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invitations`
--

DROP TABLE IF EXISTS `Invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Invitations` (
  `inviteID` int(11) NOT NULL AUTO_INCREMENT,
  `Sendr` tinytext,
  `docID` int(11) DEFAULT NULL,
  `Receivr` tinytext,
  PRIMARY KEY (`inviteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invitations`
--

LOCK TABLES `Invitations` WRITE;
/*!40000 ALTER TABLE `Invitations` DISABLE KEYS */;
/*!40000 ALTER TABLE `Invitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Permissions`
--

DROP TABLE IF EXISTS `Permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Permissions` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `Class` tinytext NOT NULL,
  `Wrt` tinyint(4) NOT NULL,
  `Read_Doc` tinyint(4) NOT NULL,
  `Complain` tinyint(4) NOT NULL,
  `Share` tinyint(4) NOT NULL,
  `Lock_Doc` tinyint(4) NOT NULL,
  `Record_Changes` tinyint(4) NOT NULL,
  `Download` tinyint(4) NOT NULL,
  `Comment` tinyint(4) NOT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Permissions`
--

LOCK TABLES `Permissions` WRITE;
/*!40000 ALTER TABLE `Permissions` DISABLE KEYS */;
INSERT INTO `Permissions` VALUES (1,'Guest',0,1,0,0,0,0,0,0),(2,'Writer',1,1,0,0,0,1,0,1),(3,'Owner',1,1,1,1,1,1,1,1),(4,'Super',1,1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `Permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Revisions`
--

DROP TABLE IF EXISTS `Revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Revisions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `docID` int(11) NOT NULL,
  `Author` int(11) NOT NULL,
  `Type` tinytext NOT NULL,
  `Revised` blob NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Accept` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Author` (`Author`),
  KEY `docID` (`docID`),
  CONSTRAINT `Revisions_ibfk_1` FOREIGN KEY (`Author`) REFERENCES `Collaborators` (`userID`),
  CONSTRAINT `Revisions_ibfk_2` FOREIGN KEY (`docID`) REFERENCES `Collaborators` (`docID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Revisions`
--

LOCK TABLES `Revisions` WRITE;
/*!40000 ALTER TABLE `Revisions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Revisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Taboo`
--

DROP TABLE IF EXISTS `Taboo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Taboo` (
  `tabooID` int(11) NOT NULL AUTO_INCREMENT,
  `Bad_Words` tinytext NOT NULL,
  PRIMARY KEY (`tabooID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Taboo`
--

LOCK TABLES `Taboo` WRITE;
/*!40000 ALTER TABLE `Taboo` DISABLE KEYS */;
INSERT INTO `Taboo` VALUES (1,'ass'),(2,'asshole'),(3,'bastard'),(4,'crap'),(5,'Christ on a bike'),(6,'Christ on a cracker'),(7,'damn'),(8,'goddamn'),(9,'goddamnit'),(10,'hell'),(11,'shit'),(12,'holyshit'),(13,'Jesus Christ'),(14,'Jesus'),(15,'shit'),(16,'whore'),(17,'stupid'),(18,'millenials'),(19,'dummy'),(20,'Bloody Hell'),(21,'Rubbish');
/*!40000 ALTER TABLE `Taboo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(15) NOT NULL,
  `Type` varchar(15) NOT NULL DEFAULT 'Basic',
  `Email` varchar(50) NOT NULL,
  `Password` char(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'chloe','Super','cl@me.com','swe322'),(2,'chloe0','Basic','cl0@me.com','swe323');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-12  2:26:05
