<?php
/**
 * CPR Rwanda website — contact form handler.
 * Receives submissions from the /contact page and emails them to the
 * secretariat inbox. Deployed as a static file alongside the built SPA,
 * so it is reached directly at /cpr/contact.php (Apache serves real files
 * before the SPA-fallback rewrite in .htaccess kicks in).
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Accept JSON (from fetch) or classic form-encoded POST as a fallback.
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: a hidden field real visitors never fill in. If it has a value,
// silently report success so automated bots learn nothing.
if (!empty($data['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name    = trim((string)($data['name'] ?? ''));
$email   = trim((string)($data['email'] ?? ''));
$phone   = trim((string)($data['phone'] ?? ''));
$subject = trim((string)($data['subject'] ?? 'General Inquiry'));
$message = trim((string)($data['message'] ?? ''));

$errors = [];
if ($name === '') $errors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($message === '') $errors[] = 'message';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Invalid input', 'fields' => $errors]);
    exit;
}

// Keep this from being abused as a mail relay for huge payloads.
$name    = mb_substr($name, 0, 150);
$phone   = mb_substr($phone, 0, 40);
$subject = mb_substr($subject, 0, 150);
$message = mb_substr($message, 0, 5000);

$to = 'cprgs@cpr-rwanda.rw';
$mailSubject = '[CPR Website] ' . $subject;

$body = "New message from the CPR Rwanda website contact form:\n\n"
      . "Name:    {$name}\n"
      . "Email:   {$email}\n"
      . "Phone:   " . ($phone !== '' ? $phone : '\xe2\x80\x94') . "\n"
      . "Subject: {$subject}\n\n"
      . "Message:\n{$message}\n";

// Send From a same-domain address for deliverability; replies go straight
// to the visitor via Reply-To.
$fromAddr = 'website@cpr-rwanda.rw';

$safeName = str_replace(["\r", "\n"], '', $name);
$headers   = [];
$headers[] = 'From: CPR Website <' . $fromAddr . '>';
$headers[] = 'Reply-To: ' . $safeName . ' <' . $email . '>';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = mail($to, $mailSubject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Could not send message']);
}
