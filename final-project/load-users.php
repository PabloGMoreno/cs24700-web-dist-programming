<?php
    header("Content-Type: application/json; charset=UTF-8");
    $myfile = fopen("D:/home/site/wwwroot/final-project/users.json", "r") or die("Unable to open file to read!");
    $obj = fread($myfile,filesize("D:/home/site/wwwroot/final-project/users.json"));
    fclose($myfile);
    echo $obj;
?>