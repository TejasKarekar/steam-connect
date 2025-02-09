<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $donor_id = sanitize_input($_POST['donor_id']);
    $file = $_FILES['file'];

    $file_name = uniqid() . '_' . $file['name'];
    $file_destination = 'uploads/' . $file_name;

    if (move_uploaded_file($file['tmp_name'], $file_destination)) {
        $sql = "UPDATE donors SET swab_report = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $file_name, $donor_id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'File uploaded successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'File upload failed']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'File move failed']);
    }
}

$conn->close();