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


    public function getPopularCities($accountID){

        $cities = $this->getDB()
        ->query("  SELECT SUBSTRING_INDEX(clients.address, ',', -1) as City,
        count(clients.id) as Number_of_rentals
       FROM clients
       inner join rentals_games on clients.id=rentals_games.clientID
       WHERE clients.accountID=$accountID
       group by City
       order by  Number_of_rentals desc
       LIMIT 5;")->fetch_all(MYSQLI_ASSOC);
    if($cities==[]){
      
        throw new Exception($this->getDB()->error);
    }
    return $cities;


      
    }

   public function getProfitableMonths($id){

    $months = $this->getDB()
    ->query("SELECT month(rentals_games.creation_time) as Month, sum(rentals_games.price) Profit,count(rentals_games.id) as rentals_number
    from rentals_games
    inner join clients on clients.id=rentals_games.clientID
    where clients.accountID=$id
    group by month;")->fetch_all(MYSQLI_ASSOC);
if($months==[]){
  
    throw new Exception($this->getDB()->error);
}
return $months;

   }

   public function getGenreData($id){

    $genres = $this->getDB()
    ->query("SELECT games.genre, count(games.id) as rentals_number
    from games
    inner join rentals_games on rentals_games.gameID=games.id
    inner join clients on clients.id=rentals_games.clientID
    where clients.accountID=$id
    group by games.genre;")->fetch_all(MYSQLI_ASSOC);
if($genres==[]){
  
    throw new Exception($this->getDB()->error);
}
return $genres;

   }
  
   public function getTotalEarning($id){
  

    $earning = $this->getDB()
    ->query("  select sum(price) as total_earning
    from rentals_games
    inner join clients on clients.id=rentals_games.clientID
    where  clients.accountID='$id';")->fetch_all(MYSQLI_ASSOC);
if($earning==[]){
  
    throw new Exception($this->getDB()->error);
}
return $earning;


   }



   public function getClientsNumber($id){
  

    $clients_number = $this->getDB()
    ->query("select count(clients.id) as clients_number
    from clients
    where  clients.accountID='$id';
    ")->fetch_all(MYSQLI_ASSOC);
if($clients_number==[]){
  
    throw new Exception($this->getDB()->error);
}
return $clients_number;


   }



   public function getTotalRentals($id){
  

    $earning = $this->getDB()
    ->query(" select count(rentals_games.id) as total_rentals
    from rentals_games
    inner join clients on clients.id=rentals_games.clientID
    where  clients.accountID='$id';")->fetch_all(MYSQLI_ASSOC);
if($earning==[]){
  
    throw new Exception($this->getDB()->error);
}
return $earning;


   }
}
?>