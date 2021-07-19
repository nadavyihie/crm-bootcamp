<?php
require_once("Model.php");

class Model_rentals extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAllRentals()
    {
        $rentals = $this->getDB()
            ->query("SELECT * FROM  rentals_games")
            ->fetch_all(MYSQLI_ASSOC);
            if($rentals==[]){
                
                throw new Exception($this->getDB()->error);
            }
            return $rentals;
    }
    public function getAllClientRentalsForPortal($id)
    {
        $rentals = $this->getDB()
            ->query("SELECT games.imgURL,games.gameName,DATE(rentals_games.creation_time) as start_rental_date,DATE_ADD(date(creation_time), INTERVAL rental_months MONTH) as end_date,rentals_games.price
            from games
            inner join rentals_games on games.id=rentals_games.gameID 
            inner join clients on clients.id=rentals_games.clientID 
            WHERE clients.id=$id;")
            ->fetch_all(MYSQLI_ASSOC);
            if($rentals==[]){
                
                throw new Exception($this->getDB()->error);
            }
            return $rentals;
    }

    public function getClientRentals($id)
    {
        $rentals = $this->getDB()
        ->query("SELECT rentals_games.*,games.gameName,DATE(rentals_games.creation_time) as start_rental_date,DATE_ADD(date(creation_time), INTERVAL rental_months MONTH) as end_date
        from games
        inner join rentals_games on games.id=rentals_games.gameID 
        inner join clients on clients.id=rentals_games.clientID 
        WHERE clients.id=$id;")
        ->fetch_all(MYSQLI_ASSOC);
            if($rentals==[]){
                
                throw new Exception($this->getDB()->error);
            }
            return $rentals;
    }
    
    public function getClientRentalsHistory($id)
    {
        $rentals = $this->getDB()
        ->query("SELECT rentals_games.*,games.gameName,DATE(rentals_games.creation_time) as start_rental_date,DATE_ADD(date(creation_time), INTERVAL rental_months MONTH) as end_date
        from games
        inner join rentals_games on games.id=rentals_games.gameID 
        inner join clients on clients.id=rentals_games.clientID 
        WHERE clients.id=$id and DATE_ADD(date(creation_time), INTERVAL rental_months MONTH)<now();")
        ->fetch_all(MYSQLI_ASSOC);
            if($rentals==[]){
                
                throw new Exception($this->getDB()->error);
            }
            return $rentals;
    }
    

    public function getRental($id)
    {
       
        $rental = $this->getDB()
            ->query("SELECT * FROM  rentals_games WHERE id=$id")
            ->fetch_all(MYSQLI_ASSOC);
        if($rental==[]){
          
            throw new Exception($this->getDB()->error);
        }
        return $rental;
    }

    public function insertRental($clientID,$gameID,$rental_months){


        $rentalInsert = $this->getDB()
        ->query("INSERT INTO rentals_games (clientID,gameID,rental_months,price)
         VALUES ($clientID,$gameID,$rental_months,
         (SELECT $rental_months*games.price WHERE games.id=$gameID));");
        if($rentalInsert==false)
        {
           
            throw new Exception($this->getDB()->error);
           
        }

        return true;
       
    }

    public function updateRental($id,$gameID,$clientID,$rentalMonths){
        $userInsert = $this->getDB()
        ->query("UPDATE rentals_games SET rental_months = $rentalMonths WHERE id=$id and clientID=$clientID and gameID=$gameID");
        if($userInsert==false)
        {
           
            throw new Exception($this->getDB()->error);
        }
        return true;
       
    }

    public function removeRental($id){
        $userInsert = $this->getDB()
        ->query("DELETE FROM rentals_games WHERE id='$id'");
        if($userInsert==false)
        {
           
            throw new Exception($this->getDB()->error);
        }
        return true;
       
    }
}
?>