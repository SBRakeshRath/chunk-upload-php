<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Origin: * ");


$success = false ;
$file = $_FILES["fileToUpload"] ;
$startPointer = $_POST["start_of_chunk"] ;

$name = $_FILES["fileToUpload"]["name"];
$extension =  explode(".", $name);
$extension =  end($extension);
$targetFile = "./12." . $extension ;
$targetFile = $_FILES["fileToUpload"]["name"];

// print_r($file);
// echo $startPointer ;

// now open the file in binary Mode

// fopen($targetFile,"wb");
// fseek($targetFile , $startPointer) ;
// fwrite($file , )
// $tempFilePath = "./12.tmp";

//Now get the temporary path of uploaded file
$tempFilePath = $_FILES["fileToUpload"]["tmp_name"] ;
$myFile = fopen($tempFilePath, "a+b") or die("Unable to open file!");
// echo "\n";
$fileSize = filesize($tempFilePath) ;
// $fileSize = 10 ;
// echo "MyFile size is :- ";
// echo $fileSize ;
$newData = fread($myFile,$fileSize) ;
fclose($myFile);
// echo $newData ;

// Now lets append the new data to existing data
$pFS = filesize($targetFile) ;
// echo "\n previous target file size is :- " ;
// echo $pFS;
// echo "\n";
$openTargetFile =  fopen($targetFile, "a+b") or die("Unable to open file!");
fwrite($openTargetFile, $newData);
fclose($openTargetFile);
clearstatcache();

$cFS = filesize($targetFile) ;
// echo "\n previous target file size is :- " ;
// echo $cFS;

if($cFS > $pFS){
    // echo("\n successfully uploaded") ;
    $success = true ;
}
// echo "\n";

$responseArray = ["success" => true] ;
echo json_encode($responseArray);

// exit();
