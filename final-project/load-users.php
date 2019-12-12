<?php
    header("Content-Type: application/json; charset=UTF-8");
    $myfile = fopen("users.json", "r") or die("Unable to open file to read!");
    $obj = fread($myfile,filesize("users.json"));
    fclose($myfile);
    echo $obj;
?>