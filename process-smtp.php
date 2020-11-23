<?php
	
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$ds = DIRECTORY_SEPARATOR;
$base_dir = realpath(dirname(__FILE__)  . $ds . '..') . $ds;
require_once("PHPMailer/Exception.php");
require_once("PHPMailer/PHPMailer.php");
require_once("PHPMailer/SMTP.php");

//Create a new PHPMailer instance
$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;

//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';

//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 587;

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication
$mail->Username = 'happy.media.dev@gmail.com';

//Password to use for SMTP authentication
$mail->Password = '';

$mail->SMTPSecure = 'tls';

//Set who the message is to be sent from
$mail->setFrom($_POST['email'], $_POST['nume']);

//Set an alternative reply-to address
$mail->addReplyTo($_POST["email"], $_POST["nume"]);

//Set who the message is to be sent to
$mail->addAddress('sounday.audio@gmail.com');

//Set the subject line
$mail->Subject = "Ai primit email";

$message = "<b>Nume:</b> ".$_POST["nume"]."<br>".
		   "<b>Telefon:</b> ".$_POST["telefon"]."<br>".
		   "<b>Email:</b> ".$_POST["email"]."<br>".
		   "<b>Invitati:</b> ".$_POST["invitati"]."<br>".
		   "<b>Data:</b> ".$_POST["data"]."<br><br>";
$comanda = "<u>Comanda</u>"."<br>";

$client = array("nume", "telefon", "email", "invitati", "data");
foreach ($_POST as $key => $value) {
	if (!in_array($key, $client)) $comanda.=  $value."<br>";
}

$message.=  $comanda;

$mail->MsgHTML($message);

$mail->IsHTML(true);

//send the message, check for errors
if (!$mail->send()) {
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {	
    header('Location: index.html#success');
}	

?>
