<?php
    header("Content-Type: application/json; charset=UTF-8");
    $myfiler = fopen("information.json", "r") or die("Unable to open file to read!");
    $obj = fread($myfiler,filesize("information.json"));
    fclose($myfiler);
    echo $obj;
?>