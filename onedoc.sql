-- DROP DATABASE onedoc;
CREATE DATABASE onedoc;

USE onedoc; -- use onedoc database

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(15) NOT NULL,
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
  content blob,
  created_at datetime NOT NULL,
  modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  locked bit(1) NOT NULL,
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
  R bit(1) NOT NULL,
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
  issue varchar(60) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved bit(1) NOT NULL,
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
  accept bit(1) DEFAULT NULL,
  KEY author (author),
  KEY docID (docID),
  FOREIGN KEY (author) REFERENCES collaborators (userID),
  FOREIGN KEY (docID) REFERENCES collaborators (docID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES revisions WRITE;
UNLOCK TABLES;


-- Populate
INSERT INTO users(username, email, password)
VALUES ("Connie", "connie@gmail.com", "people123"),
  ("Friend", "friend@gmail.com", "people123");
