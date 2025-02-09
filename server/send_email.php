<?php
require 'vendor/autoload.php';
require_once 'config.php';

use SendGrid\Mail\Mail;

function send_email($to, $subject, $content) {
    $email = new Mail();
    $email->setFrom("noreply@stemconnect.com", "StemConnect");
    $email->setSubject($subject);
    $email->addTo($to);
    $email->addContent("text/html", $content);

    $sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));

    try {
        $response = $sendgrid->send($email);
        return $response->statusCode() == 202;
    } catch (Exception $e) {
        error_log('Caught exception: '. $e->getMessage() ."\n");
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = sanitize_input($_POST['to']);
    $subject = sanitize_input($_POST['subject']);
    $content = sanitize_input($_POST['content']);

    $result = send_email($to, $subject, $content);
    echo json_encode(['success' => $result]);
}