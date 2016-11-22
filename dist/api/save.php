<?php

if (strtoupper($_SERVER['REQUEST_METHOD']) !== 'POST') {
	json(false, 'Méthode non supportée (' . $_SERVER['REQUEST_METHOD'] . ')');
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
) {
	json(false, 'Vous devez remplir tous les champs');
}

checkCaptcha(
	'6LdRfAwUAAAAAN0JzdMgpJbNh9qf4Dpn_beo-W6a',
	$_POST['g-recaptcha-response'],
	$_SERVER['REMOTE_ADDR']
);

if (file_put_contents(
	$_SERVER['DOCUMENT_ROOT'] . 'mailing/Islandtours-is-Mag/island-tours.csv',
  $_POST['first-name'] . ';' .
  $_POST['last-name'] . ';' .
  $_POST['email'] . ';' .
  $_POST['address'] . ';' .
  $_POST['zip'] . ';' .
  $_POST['city'] . ';' .
  $_POST['country'] . "\n",
  FILE_APPEND | LOCK_EX
) === false) {
	json(false, 'Erreur lors de la sauvegarde des données');
}

json(true);

// ==================== FUNCTIONS ==================== //

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
		json(false, 'Erreur lors de la validation du captcha');
	}
}

function json($success, $data = null)
{
	header('Content-Type: application/json');
	echo json_encode(['success' => !!$success, 'data' => $data]);
	exit($success ? 0 : -1);
}
