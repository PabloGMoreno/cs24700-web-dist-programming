<?php
    header("Content-Type: application/json; charset=UTF-8");
    $myfiler = fopen("users.json", "r") or die("Unable to open file to read!");
    $obj = fread($myfiler,filesize("users.json"));
    fclose($myfiler);
    echo $obj;
?>