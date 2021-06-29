CREATE TABLE accounts
 (
 `id` int NOT NULL AUTO_INCREMENT,
 `fullName` varchar(20) NOT NULL,
 `companyName` varchar(20) NOT NULL,
 `phoneNumber` int(10) NOT NULL,
 `email` varchar(30) NOT NULL,
 `userPassword` varchar(50) NOT NULL,
 `resetPassToken` varchar(200) DEFAULT NULL UNIQUE,
   CONSTRAINT id_pk PRIMARY KEY (id)

);

alter table accounts add COLUMN userName VARCHAR(20) NOT NULL AFTER id;