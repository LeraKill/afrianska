<?php

$recepient = "kilinav25@gmail.com";
$siteName = "Ajax-форма";

$name = trim($_POST["name"]);
$phone = trim($_POST["email"]);
$message = "Name: $name \nEmail: $email";

$pagetitle = "Заявка с сайта \"$siteName\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>