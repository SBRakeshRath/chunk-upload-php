<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Origin: * ");
print_r($_FILES);
print_r($_POST);
$newFileCreatedSuccess = false;

$tempFilePath = $_FILES["fileToUpload"]["tmp_name"];

echo $_POST["is_tmp_exist"];

if ($_POST["is_tmp_exist"] === "true") {
    echo "exist";


    // check if tempName Exist or not

    if (file_exists($_POST["temp_name"])) {

        

        echo "file exists";
        $name = $_FILES["fileToUpload"]["name"];
        $extension =  explode(".", $name);
        $extension =  end($extension);

        // rename the file 
        $nameTemp = explode(".", $_POST["temp_name"]) ;
        array_pop($nameTemp);
        $nameTemp = implode($nameTemp);
        $new_name = $nameTemp . "." .$extension ;
        rename($_POST["temp_name"] ,$new_name) ;



        // $targetFile = $_POST["temp_name"] . "." . $extension;
        $targetFile = $new_name ;

        echo "\n";
        echo $new_name ;
        $myFile = fopen($tempFilePath, "a+b") or die("Unable to open file!");
        $fileSize = filesize($tempFilePath);
        echo $fileSize ;
        $newData = fread($myFile, $fileSize);
        fclose($myFile);
        $pFS = filesize($targetFile);
        $openTargetFile =  fopen($targetFile, "a+b") or die("Unable to open file!");
        fwrite($openTargetFile, $newData);
        fclose($openTargetFile);
        clearstatcache();

        $cFS = filesize($targetFile);
        if ($cFS > $pFS) {
            echo ("\n successfully uploaded");
        }
        echo "\n"  ;
        echo $cFS ;
        echo "\n"  ;
        echo $pFS ;
    }
} else {

    // create newFile 
    $FileSize = filesize($tempFilePath = $_FILES["fileToUpload"]["tmp_name"]);
    echo $FileSize;

    // sleep(50);

    if (filesize($tempFilePath = $_FILES["fileToUpload"]["tmp_name"]) < 1000001) {
        echo "created Successfully";
        $name = $_FILES["fileToUpload"]["name"];
        $extension =  explode(".", $name);
        $extension =  end($extension);
        $new_name = mt_rand(100, 100000). "." . $extension;

        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $new_name)) {

            $newFileCreatedSuccess = true;
        }
    }
}
