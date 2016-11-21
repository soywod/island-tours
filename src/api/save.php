<?php

require_once 'database.php';

if (strtoupper($_SERVER['REQUEST_METHOD']) !== 'POST') {
	jsonResponse(false, 'Méthode non supportée (' . $_SERVER['REQUEST_METHOD'] . ')');
}

if (
	!isset($_POST) ||
	!isset($_POST['first-name']) ||
	!isset($_POST['last-name']) ||
	!isset($_POST['address']) ||
	!isset($_POST['zip']) ||
	!isset($_POST['city']) ||
	!isset($_POST['country']) ||
	!isset($_POST['email']) ||
	!isset($_POST['g-recaptcha-response'])
) jsonResponse(false, 'Vous devez remplir tous les champs');

checkCaptcha(
	'6LdRfAwUAAAAAN0JzdMgpJbNh9qf4Dpn_beo-W6a',
	$_POST['g-recaptcha-response'],
	$_SERVER['REMOTE_ADDR']
);

$stmt = $pdo->prepare('
	INSERT INTO `users`
	(`first_name`, `last_name`, `address`, `zip`, `city`, `country`, `email`, `date`)
	VALUES
	(?, ?, ?, ?, ?, ?, ?, NOW())
');

if (!$stmt->execute([
	$_POST['first-name'],
	$_POST['last-name'],
	$_POST['address'],
	$_POST['zip'],
	$_POST['city'],
	$_POST['country'],
	$_POST['email']
])
) jsonResponse(false, 'Erreur lors de l\'insert en base');

$stmt->closeCursor();
$pdo = null;

jsonResponse(true);

function checkCaptcha($secret, $response, $remoteip)
{
	$curl = curl_init();
	
	curl_setopt($curl, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, "secret=$secret&response=$response&remoteip=$remoteip");
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	
	$res = json_decode(curl_exec($curl), true);
	curl_close($curl);
	
	if ($res['success'] !== true) {
		jsonResponse(false, 'Erreur lors de la validation du captcha');
	}
}
