

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
