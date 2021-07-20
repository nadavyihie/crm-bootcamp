<?php
require_once("Model.php");

class Model_games extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAllGames()
    {
        $games = $this->getDB()
            ->query("SELECT * FROM  games")
            ->fetch_all(MYSQLI_ASSOC);
          
            if($games==[]){
                
                throw new Exception($this->getDB()->error);
            }
            return $games;
    }

   
    

    public function getGame($id)
    {
       
        $game = $this->getDB()
            ->query("SELECT * FROM  game WHERE id=$id")
            ->fetch_all(MYSQLI_ASSOC);
        if($game==[]){
          
            throw new Exception($this->getDB()->error);
        }
        return $game;
    }

    public function insertGame($gameName,$genre,$rating,$price,$imgURL){


        $gameInsert = $this->getDB()
        ->query("INSERT INTO games (gameName,genre,rating,price,imgURL) VALUES ('$gameName','$genre',$rating,$price
        ,'$imgURL')");
        if($gameInsert==false)
        {
           
            throw new Exception($this->getDB()->error);
           
        }
        return true;
       
    }

    public function updateGame($id,$gameName,$genre,$rating,$price,$imgURL){
        $userInsert = $this->getDB()
        ->query("UPDATE games SET gameName = '$gameName', genre = '$genre' , rating=$rating, price=$price ,imgURL='$imgURL' WHERE id='$id'");
        if($userInsert==false)
        {
           
            throw new Exception($this->getDB()->error);
        }
        return true;
       
    }

    public function removeGame($id){
        $userInsert = $this->getDB()
        ->query("DELETE FROM games WHERE id=$id");
        if($userInsert==false)
        {
           
            throw new Exception($this->getDB()->error);
        }
        return true;
       
    }
}
?>