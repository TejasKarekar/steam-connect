<?php
require 'vendor/autoload.php';
require_once 'config.php';

use Twilio\Rest\Client;

function send_sms($to, $message) {
    $account_sid = getenv('TWILIO_ACCOUNT_SID');
    $auth_token = getenv('TWILIO_AUTH_TOKEN');
    $twilio_number = getenv('TWILIO_PHONE_NUMBER');

    $client = new Client($account_sid, $auth_token);

    try {
        $client->messages->create(
            $to,
            [
                'from' => $twilio_number,
                'body' => $message
            ]
        );
        return true;
    } catch (Exception $e) {
        error_log('Caught exception: '. $e->getMessage() ."\n");
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = sanitize_input($_POST['to']);
    $message = sanitize_input($_POST['message']);

    $result = send_sms($to, $message);
    echo json_encode(['success' => $result]);
}