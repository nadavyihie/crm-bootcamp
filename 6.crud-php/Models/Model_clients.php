<?php
require_once("Model.php");

class Model_clients extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAllClients()
    {
        $clients = $this->getDB()
            ->query("SELECT * FROM  clients")
            ->fetch_all(MYSQLI_ASSOC);
        return $clients;
    }

    public function getAccountClients($id)
    {
       
        $clients = $this->getDB()
            ->query("SELECT * FROM  clients WHERE accountID=$id")
            ->fetch_all(MYSQLI_ASSOC);
    
        if($clients==[]){
            return 401;
        }
        return $clients;
    }

    public function getClient($id)
    {
       
        $client = $this->getDB()
            ->query("SELECT * FROM  clients WHERE id=$id")
            ->fetch_all(MYSQLI_ASSOC);
        if($client==[]){
            return 401;
        }
        return $client;
    }

    public function insertClient($accountID,$fullName,$email,$phoneNumber,$address){
        $userInsert = $this->getDB()
        ->query("INSERT INTO clients (accountID,fullName,email,phoneNumber,address) VALUES ('$accountID','$fullName','$email','$phoneNumber','$address')");
        if($userInsert==false)
        {
            return 401;
        }
        return true;
       
    }

    public function updateClient($id,$fullName,$email,$phoneNumber,$address){
        $userInsert = $this->getDB()
        ->query("UPDATE clients SET fullName = '$fullName', email = '$email' , phoneNumber=$phoneNumber, address='$address' WHERE id='$id'");
        
        return true;
       
    }

    public function removeClient($id){
        $userInsert = $this->getDB()
        ->query("DELETE FROM clients WHERE id='$id'");
        if($userInsert==false)
        {
            return 401;
        }
        return true;
       
    }
}
?>