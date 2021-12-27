


CREATE TABLE games (
   `id` int NOT NULL AUTO_INCREMENT,
    `gameName` varchar(30) NOT NULL UNIQUE,
	`genre` varchar(50) NOT NULL,
 `rating` float(3) NOT NULL,
 `price` int not null ,
 `imgURL` varchar(50) not null ,
   CONSTRAINT id_pk PRIMARY KEY (id)
);


CREATE TABLE rentals_games (
   `id` int NOT NULL AUTO_INCREMENT,
   'clientID' int NOT NULL,
    `gameID` int NOT NULL,
      `creation_time`     DATETIME DEFAULT CURRENT_TIMESTAMP,
    `modification_time` DATETIME ON UPDATE CURRENT_TIMESTAMP,
    `rental_months` int(2),
    'price' int NOT NULL DEFAULT 0;
   CONSTRAINT id_pk PRIMARY KEY (id),
);

UPDATE rentals_games
INNER JOIN games ON rentals_games.gameID = games.id 
SET rentals_games.price = (rentals_games.rental_months*games.price);

CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountID` int(11) NOT NULL,
  `fullName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phoneNumber` tinytext NOT NULL,
  `address` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
  );






CREATE TABLE accounts
 (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(20) NOT NULL,
  `userPassword` varchar(50) NOT NULL,
  `fullName` varchar(20) NOT NULL,
  `companyName` varchar(30) NOT NULL,
  `managerID` varchar(50) NOT NULL DEFAULT '-1',
  `resetPassToken` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `resetPassToken` (`resetPassToken`)

);



select creation_time,rental_months,DATE_ADD(date(creation_time), INTERVAL rental_months MONTH) as end_date
from rentals_games;