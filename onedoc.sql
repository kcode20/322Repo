DROP DATABASE onedoc;
CREATE DATABASE onedoc;

USE onedoc; -- use onedoc database

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(15) NOT NULL,
  type varchar(15) NOT NULL DEFAULT 'Basic',
  email varchar(50) NOT NULL,
  password char(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES users WRITE;
UNLOCK TABLES;

--
DROP TABLE IF EXISTS documents;

CREATE TABLE documents (
  docID int(11) NOT NULL AUTO_INCREMENT,
  owner int(11) NOT NULL,
  title varchar(45) NOT NULL,
  content text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  locked tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (docID),
  KEY owner (owner),
  FOREIGN KEY (owner) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES documents WRITE;
UNLOCK TABLES;
--

DROP TABLE IF EXISTS permissions;

CREATE TABLE permissions (
  classID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  class tinytext NOT NULL,
  wrt bit(1) NOT NULL,
  R tinyint(1) NOT NULL,
  complain tinyint(1) NOT NULL,
  share tinyint(1) NOT NULL,
  loc tinyint(1) NOT NULL, -- lock
  rec tinyint(1) NOT NULL,  -- record if a user can revise, record changes
  download tinyint(1) NOT NULL,
  comment tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES permissions WRITE;
UNLOCK TABLES;
--

DROP TABLE IF EXISTS collaborators;

CREATE TABLE collaborators (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  docID int(11) NOT NULL,
  userID int(11) NOT NULL,
  classID int(11) NOT NULL,
  KEY docID (docID),
  KEY userID (userID),
  KEY classID (classID),
  FOREIGN KEY (docID) REFERENCES documents (docID),
  FOREIGN KEY (userID) REFERENCES users (id),
  FOREIGN KEY (classID) REFERENCES permissions (classID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES collaborators WRITE;
UNLOCK TABLES;
--

DROP TABLE IF EXISTS complaints;

CREATE TABLE complaints (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  docID int(11) NOT NULL,
  author int(11) NOT NULL,
  issue varchar(60) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved tinyint(1) NOT NULL,
  KEY author (author),
  KEY docID (docID),
  FOREIGN KEY (author) REFERENCES collaborators (userID),
  FOREIGN KEY (docID) REFERENCES collaborators (docID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES complaints WRITE;
UNLOCK TABLES;
--

DROP TABLE IF EXISTS revisions;

CREATE TABLE revisions (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  docID int(11) NOT NULL,
  author int(11) NOT NULL,
  type tinytext NOT NULL,
  revised blob NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  accept tinyint(1) DEFAULT NULL,
  KEY author (author),
  KEY docID (docID),
  FOREIGN KEY (author) REFERENCES collaborators (userID),
  FOREIGN KEY (docID) REFERENCES collaborators (docID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES revisions WRITE;
UNLOCK TABLES;
--

DROP TABLE IF EXISTS `Taboo`;

CREATE TABLE `Taboo` (
  `tabooID` int(11) NOT NULL AUTO_INCREMENT,
  `Bad_Words` tinytext NOT NULL,
  PRIMARY KEY (`tabooID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Taboo` WRITE;

UNLOCK TABLES;
--                           
DROP TABLE IF EXISTS `Invitations`;

CREATE TABLE `Invitations` (
  `inviteID` int(11) NOT NULL AUTO_INCREMENT,
  `Sendr` tinytext,
  `docID` int(11) DEFAULT NULL,
  `Receivr` tinytext,
  PRIMARY KEY (`inviteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Invitations` WRITE;

UNLOCK TABLES;

-- Populate
INSERT INTO users(username, email, password)
VALUES ("Connie", "connie@gmail.com", "people123"),
  ("Friend", "friend@gmail.com", "people123");
INSERT INTO `Taboo` VALUES (1,'ass'),(2,'asshole'),(3,'bastard'),(4,'crap'),(5,'Christ on a bike'),(6,'Christ on a cracker'),(7,'damn'),(8,'goddamn'),(9,'goddamnit'),(10,'hell'),(11,'shit'),(12,'holyshit'),(13,'Jesus Christ'),(14,'Jesus'),(15,'shit'),(16,'whore'),(17,'stupid'),(18,'millenials'),(19,'dummy'),(20,'Bloody Hell'),(21,'Rubbish');
INSERT INTO documents(owner, title, content, locked) VALUES('1', 'My First Document', 'This is my first document. I love to write!', 0);
INSERT INTO documents(owner, title, content, locked) VALUES('1', 'My Second Document', 'This is my second document. I like to write!', 0);
INSERT INTO documents(owner, title, content, locked) VALUES('1', 'My Third Document', 'This is my third document. I hate to write!', 0);
