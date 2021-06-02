<?php 
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Origin: * ");

$array = ["1","2"];
print_r($_POST);
print_r($_FILES);
echo("HALLO") ;
echo json_encode($array);

// get extension of uploaded file 
$name = $_FILES["fileToUpload"]["name"] ;
$extension =  explode(".", $name);
$extension =  end($extension);

// get the file 

$file = $_FILES["fileToUpload"] ;

$fh = fopen( $file, 'rb' );


// temporary file 

// $dir = "./";
// $tmp = tempnam($dir, "foo");
// file_put_contents($tmp, "hello");

// end of temp file 
$new_name = "./12.tmp" ;

echo($name);
// move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $new_name);


// echo $dir ;
// echo("\n") ;
// echo $tmp ;
