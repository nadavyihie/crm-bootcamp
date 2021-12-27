<?php



abstract class  controller
{
    public $response;
    public $errors = "";
    public $model;
    public $model_cls;

    public function __construct()
    {
        $model_class_name = "Model_" . $this->model_cls;
        require_once("./Models/$model_class_name.php");
        $this->model = new $model_class_name();
    }


    abstract public function readAll();
    
    abstract public function create();
    
    abstract public function remove();

    abstract public function update();
    
    abstract public function read();

    
}
