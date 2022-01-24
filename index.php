<?php
if(!empty($_POST['name']) && !empty($_POST['email'])){
	echo "successfull request";
	header("HTTP/1.1 200 OK");
}
?>
