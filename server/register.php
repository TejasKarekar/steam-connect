<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $phone = sanitize_input($_POST['phone']);
    $medical_history = sanitize_input($_POST['medicalHistory']);
    $hla_type = sanitize_input($_POST['hlaType']);

    $swab_report = $_FILES['swabReport'];
    $file_name = uniqid() . '_' . $swab_report['name'];
    $file_destination = 'uploads/' . $file_name;

    if (move_uploaded_file($swab_report['tmp_name'], $file_destination)) {
        $sql = "INSERT INTO donors (name, email, phone, medical_history, hla_type, swab_report) 
                VALUES (?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssss", $name, $email, $phone, $medical_history, $hla_type, $file_name);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Registration successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'File upload failed']);
    }
}

$conn->close();