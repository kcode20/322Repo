DROP DATABASE onedoc;
CREATE DATABASE onedoc;

USE onedoc; -- use onedoc database

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(15) NOT NULL UNIQUE,
  email varchar(50) NOT NULL UNIQUE,
  password char(60) NOT NULL,
  type ENUM('G', 'OU', 'SU') NOT NULL DEFAULT 'G'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES users WRITE;
UNLOCK TABLES;

--
DROP TABLE IF EXISTS documents;

CREATE TABLE documents (
  docID int(11) NOT NULL AUTO_INCREMENT,
  owner int(11) NOT NULL,
  title varchar(45) NOT NULL,
  content VARCHAR(1000),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  locked ENUM('locked', 'unlocked') NOT NULL DEFAULT 'locked',
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
  R BOOLEAN NOT NULL,
  complain bit(1) NOT NULL,
  new bit(1) NOT NULL,
  share bit(1) NOT NULL,
  loc bit(1) NOT NULL, -- lock
  rec bit(1) NOT NULL,  -- record if a user can revise, record changes
  download bit(1) NOT NULL,
  comment bit(1) NOT NULL
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
  issue varchar(1000) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  type ENUM("ComplainAboutOwner", "ComplainAboutOU"),
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
  revised VARCHAR(2000) NOT NULL,
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
DROP TABLE IF EXISTS taboo;

CREATE TABLE taboo(
  tabooId INT PRIMARY KEY AUTO_INCREMENT,
  tabooWord VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES taboo WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS invitations;

CREATE TABLE invitations(
  inviteID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sender VARCHAR(255),
  docID int(11) DEFAULT NULL,
  receiver VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES invitations WRITE;
UNLOCK TABLES;

-- Populate database
INSERT INTO users(username, email, password) VALUES
  ("Connie", "connie@gmail.com", "people123"),
  ("Khristian", "khristian@gmail.com", "people123"),
  ("Song", "song@gmail.com", "people123"),
  ("Chantelle", "chantelle@gmail.com", "people123");
INSERT INTO `Taboo` VALUES (1,'ass'),(2,'asshole'),(3,'bastard'),(4,'crap'),(5,'Christ on a bike'),(6,'Christ on a cracker'),(7,'damn'),(8,'goddamn'),(9,'goddamnit'),(10,'hell'),(11,'shit'),(12,'holyshit'),(13,'Jesus Christ'),(14,'Jesus'),(15,'shit'),(16,'whore'),(17,'stupid'),(18,'millenials'),(19,'dummy'),(20,'Bloody Hell'),(21,'Rubbish');

INSERT INTO documents(owner, title, content, created_at, modified_at, locked)
VALUES (1, "Software Engineering", "asdfghjkl;qwertyuiopzxcvbnm", DATE '2018-08-15', DATE '2018-10-15', 'locked'),
 (1, "Flower", "Tulips, daisy, sunflower", DATE '2018-11-15', DATE '2018-12-01', 'locked'),
 (2, "US history", "American Revolution, George Washington", DATE '2018-12-02', DATE '2018-12-10', 'locked');
 
-- INSERT INTO documents(owner, title, content) VALUES('1', 'My First Document', 'This is my first document. I love to write!');
-- INSERT INTO documents(owner, title, content) VALUES('1', 'My Second Document', 'This is my second document. I like to write!');
-- INSERT INTO documents(owner, title, content) VALUES('1', 'My Third Document', 'This is my third document. I hate to write!');
