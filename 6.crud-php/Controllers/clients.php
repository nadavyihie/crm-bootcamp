<?php

use JetBrains\PhpStorm\Internal\ReturnTypeContract;

require_once('controller.php');


class Clients extends controller
{

    public $model_cls = "clients";
    public function __construct()
    {
        parent::__construct();
    }
    public function readAll()
    {
        $clients = $this->model->getAllClients();
        $this->response["clients"] = $clients;
        return $this->response;
    }

    public function readAccountClients(){

        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $clients = $this->model->getAccountClients($id);
        if($clients==401)
        return 401;
        $this->response["clients"] = $clients;
        return $this->response;
    }

    public function read()
    {

        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $client = $this->model->getClient($id);
        $this->response["client"] = $client;
        return $this->response;
    }
     public function create(){

            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            $accountID=$input['accountID'];
            $fullName=$input['fullName'];
            $email=$input['email'];
            $phoneNumber=$input['phoneNumber'];
            $address=$input['address'];
            $clientInsert=$this->model->insertClient($accountID,$fullName,$email,$phoneNumber,$address);
            return $clientInsert;
     }
    
     public function remove(){
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $clientRemoved=$this->model->removeClient($id);
        return $clientRemoved;
     }

     public function update(){
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);


            $id=$input['id'];
            $fullName=$input['fullName'];
            $email=$input['email'];
            $phoneNumber=$input['phoneNumber'];
            $address=$input['address'];
            $clientUpdate=$this->model->updateClient($id,$fullName,$email,$phoneNumber,$address);
            return $clientUpdate;
     }
}
?>