DROP DATABASE onedoc;
CREATE DATABASE onedoc;

USE onedoc;

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(15) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` char(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS `Documents`;

CREATE TABLE `Documents` (
  `docID` int(11) NOT NULL AUTO_INCREMENT,
  `Owner` int(11) NOT NULL,
  `Title` varchar(45) NOT NULL,
  `Content` blob,
  `Created_at` datetime NOT NULL,
  `Modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Locked` bit(1) NOT NULL,
  PRIMARY KEY (`docID`),
  KEY `Owner` (`Owner`),
  CONSTRAINT `Documents_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


LOCK TABLES `Documents` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `Permissions`;

CREATE TABLE `Permissions` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `Class` tinytext NOT NULL,
  `Wrt` bit(1) NOT NULL,
  `R` bit(1) NOT NULL,
  `Complain` bit(1) NOT NULL,
  `New` bit(1) NOT NULL,
  `Share` bit(1) NOT NULL,
  `Loc` bit(1) NOT NULL,
  `Rec` bit(1) NOT NULL,
  `Download` bit(1) NOT NULL,
  `Comment` bit(1) NOT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Permissions` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `Collaborators`;

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

LOCK TABLES `Collaborators` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `Complaints`;

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

LOCK TABLES `Complaints` WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS `Revisions`;

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

LOCK TABLES `Revisions` WRITE;

UNLOCK TABLES;
