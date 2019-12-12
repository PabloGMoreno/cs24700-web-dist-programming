<?php
    $contacts = $_POST["users"];
    $myfile = fopen("users.json", "w") or die("Unable to open file to write!");
    fwrite($myfile, $users);
    fclose($myfile);
    echo "Users JSON file saved.";
?>