<?php


require_once('controller.php');


class Games extends controller
{

    public $model_cls = "games";
    public function __construct()
    {
        parent::__construct();
    }
    public function readAll()
    {
        $games = $this->model->getAllGames();
        $this->response["games"] = $games;
        return $this->response;
    }

    public function read()
    {

        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);
        $id=$input['id'];
        $game = $this->model->getGame($id);
        $this->response["game"] = $game;
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