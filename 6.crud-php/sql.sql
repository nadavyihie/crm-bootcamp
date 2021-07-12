


CREATE TABLE games (
   `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL UNIQUE,
	`genre` varchar(50) NOT NULL,
 `rating` float(3) NOT NULL,
 `price` int not null ,
 `imgURL` varchar(50) not null ,
   CONSTRAINT id_pk PRIMARY KEY (id)
);


CREATE TABLE rentals_games (
   `id` int NOT NULL AUTO_INCREMENT,
    `gameID` int NOT NULL,
      `creation_time`     DATETIME DEFAULT CURRENT_TIMESTAMP,
    `modification_time` DATETIME ON UPDATE CURRENT_TIMESTAMP,
    'price' DECIMAL(5,2),
   CONSTRAINT id_pk PRIMARY KEY (id),
);


CREATE TABLE clients (
   `id` int NOT NULL AUTO_INCREMENT,
      `accountID` int NOT NULL ,
    `fullName` varchar(30) NOT NULL UNIQUE,
    `email` varchar(30) NOT NULL UNIQUE,
	`phoneNumber` int(10) NOT NULL,
 `address` varchar(50) NOT NULL,
   CONSTRAINT id_pk PRIMARY KEY (id),
);
