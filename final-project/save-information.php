<?php
    $contacts = $_POST["information"];
    $myfile = fopen("information.json", "w") or die("Unable to open file to write!");
    fwrite($myfile, $information);
    fclose($myfile);
    echo "Information JSON file saved.";
?>