<?php

include 'jsonResponse.php';

try {
	$pdo = new PDO('mysql:host=localhost;dbname=island_tours', 'root', 'root');
} catch (PDOException $e) {
	jsonResponse(false, 'Erreur lors de la connexion à la base');
}
