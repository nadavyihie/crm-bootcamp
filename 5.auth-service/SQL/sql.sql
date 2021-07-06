use game_station;

CREATE TABLE accounts
 (
 `id` int NOT NULL AUTO_INCREMENT,
 `email` varchar(20) NOT NULL,
 `userPassword` varchar(20) NOT NULL,
 `fullName` int(10) NOT NULL,
 `companyName` varchar(30) NOT NULL,
 `managerID` varchar(50) NOT NULL DEFAULT=-1,
 `resetPassToken` varchar(200) DEFAULT NULL UNIQUE,
   CONSTRAINT id_pk PRIMARY KEY (id)

);
email,userPassword,fullName,companyName,managerID

alter table accounts add COLUMN userName VARCHAR(20) NOT NULL AFTER id;