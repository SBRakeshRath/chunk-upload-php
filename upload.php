<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Origin: * ");

$name = $_FILES["fileToUpload"]["name"];
$extension =  explode(".", $name);
$extension =  end($extension);
$extension = ".tmp" ;


$success = false ;

$new_name = null ;

if ($_POST["start_of_chunk"] === "0") {
    $new_name = mt_rand(100 ,100000) . $extension ;
    if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $new_name)){
        $success = true ;
    }
}

$responseArray  = ["success"=>true , "new_name"=>$new_name ] ;
echo json_encode($responseArray);

exit();

// echo $dir ;
// echo("\n") ;
// echo $tmp ;
