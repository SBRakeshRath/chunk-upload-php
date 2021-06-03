<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Origin: * ");

$name = $_FILES["fileToUpload"]["name"];
$extension =  explode(".", $name);
$extension =  end($extension);


$success = false ;


if ($_POST["start_of_chunk"] === "0") {
    $new_name = "./12.jpg";
    if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $new_name)){
        $success = true ;
    }
}

$responseArray  = ["success"=>true] ;
echo json_encode($responseArray);

// echo $dir ;
// echo("\n") ;
// echo $tmp ;
