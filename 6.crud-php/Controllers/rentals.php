<?php

use JetBrains\PhpStorm\Internal\ReturnTypeContract;

require_once('controller.php');


class Rentals extends controller
{

    public $model_cls = "rentals";
    public function __construct()
    {
        parent::__construct();
    }

    
    public function readClientRentalsForPortal()
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $rentals = $this->model->getAllClientRentalsForPortal($id);
        $this->response["rentals"] = $rentals;
        return $this->response;
    }

    public function readClientRentalsForPortalHistory()
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $rentals = $this->model->getAllClientRentalsForPortalHistory($id);
        $this->response["rentals"] = $rentals;
        return $this->response;
    }


    public function readClientRentals()
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $rentals = $this->model->getClientRentals($id);
        $this->response["rentals"] = $rentals;
        return $this->response;
    }
    
    public function readProfitableMonths(){
       
                $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $months = $this->model->getProfitableMonths($id);
        $this->response["months"] = $months;
        return $this->response;
    }

     
    public function readGenreData(){
       
        $inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$id=$input['id'];
$months = $this->model->getGenreData($id);
$this->response["genres"] = $months;
return $this->response;
}

  
public function readClientsNumber(){
       
    $inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$id=$input['id'];
$clientsNumber = $this->model->getClientsNumber($id);
$this->response["clientsNumber"] = $clientsNumber;
return $this->response;
}
     
public function readTotalEarning(){
       
    $inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$id=$input['id'];
$earning = $this->model->getTotalEarning($id);
$this->response["earning"] = $earning;
return $this->response;
}

public function readTotalRentals(){
       
    $inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);
$id=$input['id'];
$rentals = $this->model->getTotalRentals($id);
$this->response["rentals"] = $rentals;
return $this->response;
}

    public function readPopularCities()
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $cities = $this->model->getPopularCities($id);
        $this->response["cities"] = $cities;
        return $this->response;
    }

    
    public function readRentalsHistory()
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $rentals = $this->model->getRentalsHistory($id);
        $this->response["rentals"] = $rentals;
        return $this->response;
    }

    public function readAll()
    {
        $games = $this->model->getAllGames();
        $this->response["rentals"] = $games;
        return $this->response;
    }

    public function readAllRentals()
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $games = $this->model->getAllAccountRentals($id);
        $this->response["rentals"] = $games;
        return $this->response;
    }

    public function readLimitedRentals()
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $offset=$input['offset'];
        $games = $this->model->getLimitedAccountRentals($id,$offset);
        $this->response["rentals"] = $games;
        return $this->response;
    }

    public function read()
    {

        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $game = $this->model->getGame($id);
        $this->response["rentals"] = $game;
        return $this->response;
    }
     public function create(){
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
    
        $clientID=$input['clientID'];
        $rental_months=$input['rental_months'];
        $gameID=$input['gameID'];
        $gameCreate=$this->model->insertRental($gameID,$clientID,$rental_months);
        return $gameCreate;
     }
     public function getimage(){
        $file = 'images/25626.jpg';

        if (file_exists($file)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.basename($file).'"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            readfile($file);
            exit;
        }
     }

    public function saveimage(){
        
        $img=move_uploaded_file($_FILES["image"]["tmp_name"], "images/" .
        $_FILES["image"]["name"]);
        var_dump($img);

        if($img==false)
        throw new Exception("error with upload image");
        return $img;
    }
     public function remove(){
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $gameRemove=$this->model->removeGame($id);
        return $gameRemove;
     }

     public function update(){
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $rental_months=$input['rental_months'];
   
        $gameUpdate=$this->model->updateRental($id,$rental_months);
        return $gameUpdate;
     }
}
?>