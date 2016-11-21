<?php

require_once 'database.php';

const CSV_FOLDER = '/tmp';
const CSV_FILENAME = 'extract.csv';

$stmt = $pdo->query('SELECT * FROM `users` ORDER BY `date` DESC');
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

$csv = fopen(CSV_FOLDER . '/' . CSV_FILENAME, 'w');
foreach ($users as $user) {
echo $user['first_name'];
	fputcsv($csv, [
		$user['first_name'],
		$user['last_name'],
		$user['address'],
		$user['zip'],
		$user['city'],
		$user['country'],
		$user['email'],
		$user['date']
	]);
}

fclose($csv);
