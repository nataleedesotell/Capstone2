<?php
include 'C:\Users\natal\Desktop\CentralPark777\Capstone2\php\cartoDBProxy.php';
//			^CHANGE THIS TO THE PATH TO YOUR cartodbProxy.php
$queryURL = $_POST['qurl'];
$return = goProxy($queryURL);
echo $return;
?>
