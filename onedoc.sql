
DROP TABLE IF EXISTS collaborators;

CREATE TABLE collaborators (
  id int(11) NOT NULL AUTO_INCREMENT,
  docID int(11) NOT NULL,
  userID int(11) NOT NULL,
  classID int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY docID (docID),
  KEY userID (userID),
  KEY classID (classID),
  CONSTRAINT collaborators_ibfk_1 FOREIGN KEY (docID) REFERENCES documents (docID),
  CONSTRAINT collaborators_ibfk_2 FOREIGN KEY (userID) REFERENCES users (id),
  CONSTRAINT collaborators_ibfk_3 FOREIGN KEY (classID) REFERENCES permissions (classID)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

LOCK TABLES collaborators WRITE;

INSERT INTO collaborators VALUES (8,2,4,1),(9,1,2,2),(10,3,1,3);

UNLOCK TABLES;

DROP TABLE IF EXISTS complaints;

CREATE TABLE complaints (
  id int(11) NOT NULL AUTO_INCREMENT,
  docID int(11) NOT NULL,
  author int(11) NOT NULL,
  issue text NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY author (author),
  KEY docID (docID),
  CONSTRAINT complaints_ibfk_1 FOREIGN KEY (author) REFERENCES collaborators (userID),
  CONSTRAINT complaints_ibfk_2 FOREIGN KEY (docID) REFERENCES collaborators (docID)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


LOCK TABLES complaints WRITE;

INSERT INTO complaints VALUES (1,1,2,'Khristian is messing up flow yo! WTF','2018-12-12 07:14:38',0),(2,3,1,'I lost my write permission. Give it back! ','2018-12-12 07:18:02',1);
UNLOCK TABLES;

DROP TABLE IF EXISTS documents;

CREATE TABLE documents (
  docID int(11) NOT NULL AUTO_INCREMENT,
  owner int(11) NOT NULL,
  title varchar(45) NOT NULL,
  content text,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  locked enum('locked','unlocked') NOT NULL DEFAULT 'locked',
  PRIMARY KEY (docID),
  KEY owner (owner),
  CONSTRAINT documents_ibfk_1 FOREIGN KEY (owner) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


LOCK TABLES documents WRITE;
INSERT INTO documents VALUES (1,2,'My First Document','This is first document and I belong to Khristian now','2018-12-12 06:25:31','2018-12-12 06:33:21','locked'),(2,4,'My Second Document','This is second document and I belong to Chantelle now','2018-12-12 06:25:31','2018-12-12 06:32:45','locked'),(3,1,'My Third Document','This is my third document. I hate to write!','2018-12-12 06:25:31','2018-12-12 06:25:31','locked');
UNLOCK TABLES;

DROP TABLE IF EXISTS invites;

CREATE TABLE invites (
  inviteID int(11) NOT NULL AUTO_INCREMENT,
  sender int(11) NOT NULL,
  docID int(11) NOT NULL,
  receiver int(11) NOT NULL,
  PRIMARY KEY (inviteID),
  KEY sender (sender),
  KEY docID (docID),
  KEY receiver (receiver),
  CONSTRAINT invites_ibfk_1 FOREIGN KEY (sender) REFERENCES collaborators (userID),
  CONSTRAINT invites_ibfk_2 FOREIGN KEY (docID) REFERENCES collaborators (docID),
  CONSTRAINT invites_ibfk_3 FOREIGN KEY (receiver) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES invites WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS permissions;

CREATE TABLE permissions (
  classID int(11) NOT NULL AUTO_INCREMENT,
  class tinytext NOT NULL,
  wrt bit(1) NOT NULL,
  R tinyint(1) NOT NULL,
  complain bit(1) NOT NULL,
  share bit(1) NOT NULL,
  loc bit(1) NOT NULL,
  rec bit(1) NOT NULL,
  download bit(1) NOT NULL,
  comment bit(1) NOT NULL,
  PRIMARY KEY (classID)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;


LOCK TABLES permissions WRITE;

INSERT INTO permissions VALUES (1,'Guest','\0',1,'\0','\0','\0','\0','\0','\0'),(2,'Writer','',1,'\0','\0','\0','','\0',''),(3,'Owner','',1,'','','','','',''),(4,'Super','',1,'','','','','','');

UNLOCK TABLES;

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


DROP TABLE IF EXISTS revisions;

CREATE TABLE revisions (
  id int(11) NOT NULL AUTO_INCREMENT,
  docID int(11) NOT NULL,
  author int(11) NOT NULL,
  type enum('add','delete') NOT NULL,
  revised text NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  accept tinyint(1) NOT NULL,
  PRIMARY KEY (id),
  KEY author (author),
  KEY docID (docID),
  CONSTRAINT revisions_ibfk_1 FOREIGN KEY (author) REFERENCES collaborators (userID),
  CONSTRAINT revisions_ibfk_2 FOREIGN KEY (docID) REFERENCES collaborators (docID)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


LOCK TABLES revisions WRITE;
INSERT INTO revisions VALUES (1,1,2,'delete','first','2018-12-12 07:07:16',1),(2,3,1,'add','not','2018-12-12 07:08:21',0);
UNLOCK TABLES;

--
DROP TABLE IF EXISTS taboo;

CREATE TABLE taboo (
  tabooId int(11) NOT NULL AUTO_INCREMENT,
  tabooWord varchar(255) DEFAULT NULL,
  PRIMARY KEY (tabooId)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;


LOCK TABLES taboo WRITE;
INSERT INTO taboo VALUES (1,'ass'),(2,'asshole'),(3,'bastard'),(4,'crap'),(5,'Christ on a bike'),(6,'Christ on a cracker'),(7,'damn'),(8,'goddamn'),(9,'goddamnit'),(10,'hell'),(11,'shit'),(12,'holyshit'),(13,'Jesus Christ'),(14,'Jesus'),(15,'shit'),(16,'whore'),(17,'stupid'),(18,'millenials'),(19,'dummy'),(20,'Bloody Hell'),(21,'Rubbish');
UNLOCK TABLES;



DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(15) NOT NULL,
  email varchar(50) NOT NULL,
  password char(60) NOT NULL,
  type enum('G','OU','SU') NOT NULL DEFAULT 'G',
  PRIMARY KEY (id),
  UNIQUE KEY username (username),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;


LOCK TABLES users WRITE;
INSERT INTO users VALUES (1,'Connie','connie@gmail.com','people123','G'),(2,'Khristian','khristian@gmail.com','people123','G'),(3,'Song','song@gmail.com','people123','G'),(4,'Chantelle','chantelle@gmail.com','people123','G');
UNLOCK TABLES;

-- Populate database
INSERT INTO users(username, email, password) VALUES
  ("Connie", "connie@gmail.com", "people123"),
  ("Khristian", "khristian@gmail.com", "people123"),
  ("Song", "song@gmail.com", "people123"),
  ("Chantelle", "chantelle@gmail.com", "people123");
INSERT INTO taboo VALUES (1,'ass'),(2,'asshole'),(3,'bastard'),(4,'crap'),(5,'retard'),(6,'fuck'),(7,'damn'),(8,'goddamn'),(9,'goddamnit'),(10,'hell'),(11,'shit'),(12,'holyshit'),(13,'Jesus Christ'),(14,'Jesus'),(15,'shit'),(16,'whore'),(17,'stupid'),(18,'millenials'),(19,'dummy'),(20,'Bloody Hell'),(21,'Rubbish');
INSERT INTO documents(owner, title, content, created_at, modified_at, locked)
VALUES('1', 'My First Document', 'This is my first document. I love to write!', DATE '2018-08-15', DATE '2018-10-15', 'locked'),
  ('2', 'My Fab Document', 'This is my fabulous document. I like to write!', DATE '2018-11-15', DATE '2018-12-01', 'locked'),
  ('1', 'My 2nd Document', 'This is my 2nd document. I hate to write!', DATE '2018-12-02', DATE '2018-12-10', 'locked');

-- INSERT INTO complaints
-- VALUES (1,1,2,'Khristian is messing up flow yo! WTF',DATE '2018-08-15',0),
--   (2,3,1,'I lost my write permission. Give it back! ',DATE '2018-08-15',1);
