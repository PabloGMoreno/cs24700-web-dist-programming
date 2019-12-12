<?php
    $users = $_POST["users"];
    $myfile = fopen("D:/home/site/wwwroot/final-project/users.json", "w") or die("Unable to open file to write!");
    fwrite($myfile, $users);
    fclose($myfile);
    echo "Users JSON file saved.";
?>