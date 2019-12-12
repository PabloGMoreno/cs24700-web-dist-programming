<?php
    $information = $_POST["information"];
    $myfile = fopen("D:/home/site/wwwroot/final-project/information.json", "w") or die("Unable to open file to write!");
    fwrite($myfile, $information);
    fclose($myfile);
    echo "Information JSON file saved.";
?>