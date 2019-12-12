<?php
    header("Content-Type: application/json; charset=UTF-8");
    $myfile = fopen("information.json", "r") or die("Unable to open file to read!");
    $obj = fread($myfile,filesize("information.json"));
    fclose($myfile);
    echo $obj;
?>