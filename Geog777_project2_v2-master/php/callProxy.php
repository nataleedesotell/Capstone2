<?php
include 'C:\wamp64\www\Geog777_project2_v2\Geog777_project2_v2\php\cartoDBProxy.php';
//			^CHANGE THIS TO THE PATH TO YOUR cartodbProxy.php
$queryURL = $_POST['qurl'];
$return = goProxy($queryURL);
echo $return;
?>
