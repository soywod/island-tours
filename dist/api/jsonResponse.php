<?php

function jsonResponse($success, $data = null)
{
	header('Content-Type: application/json');
	echo json_encode(['success' => !!$success, 'data' => $data]);
	exit(0);
}
