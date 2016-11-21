<?php

include 'jsonResponse.php';

try {
	$pdo = new PDO('mysql:host=localhost;dbname=fisland_tours', 'root', 'root');
} catch (PDOException $e) {
	jsonResponse(false, 'Erreur lors de la connexion à la base');
}
