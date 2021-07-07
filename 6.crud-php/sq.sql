

//TODO:Capital letter
CREATE TABLE games (
   `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL UNIQUE,
	`Genre` varchar(50) NOT NULL,
 `Rating` float(3) NOT NULL,
 `price` int not null ,
 `quantity` int not null ,
   CONSTRAINT id_pk PRIMARY KEY (id)
);
//TODO:Remove  accountID 
CREATE TABLE rentals (
   `id` int NOT NULL AUTO_INCREMENT,
      `accountID` int NOT NULL ,
    `clientID` int NOT NULL,
    `gameID` int NOT NULL ,	
   CONSTRAINT id_pk PRIMARY KEY (id),
    FOREIGN KEY (accountID) REFERENCES accounts(id),
    FOREIGN KEY (clientID) REFERENCES clients(id),
	FOREIGN KEY (gameID) REFERENCES games(id)
);

CREATE TABLE clients (
   `id` int NOT NULL AUTO_INCREMENT,
      `accountID` int NOT NULL ,
    `fullName` varchar(30) NOT NULL UNIQUE,
    `email` varchar(30) NOT NULL UNIQUE,
	`phoneNumber` int(10) NOT NULL,
 `address` varchar(50) NOT NULL,
   CONSTRAINT id_pk PRIMARY KEY (id),
    FOREIGN KEY (accountID) REFERENCES accounts(id)
);
