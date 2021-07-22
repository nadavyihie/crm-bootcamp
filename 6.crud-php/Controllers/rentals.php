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

    
    public function readClientRentalsHistory()
    {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $rentals = $this->model->getClientRentalsHistory($id);
        $this->response["rentals"] = $rentals;
        return $this->response;
    }

    public function readAll()
    {
        $games = $this->model->getAllGames();
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
       
        $gameName=$input['gameName'];
        $genre=$input['genre'];
        $rating=$input['rating'];
        $price=$input['price'];
        $imgURL=$input['imgURL'];
        $gameCreate=$this->model->insertGame($gameName,$genre,$rating,$price, $imgURL);
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
        $gameName=$input['gameName'];
        $genre=$input['genre'];
        $rating=$input['rating'];
        $price=$input['price'];
        $imgURL=$input['imgURL'];
        $gameUpdate=$this->model->updateGame($id,$gameName,$genre,$rating,$price, $imgURL);
        return $gameUpdate;
     }
}
?>