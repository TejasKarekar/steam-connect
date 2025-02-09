<?php
require_once 'config.php';

function get_donors() {
    global $conn;
    $sql = "SELECT * FROM donors";
    $result = $conn->query($sql);
    $donors = [];
    while ($row = $result->fetch_assoc()) {
        $donors[] = $row;
    }
    return $donors;
}

function get_unapproved_donors() {
    global $conn;
    $sql = "SELECT * FROM donors WHERE approved = 0";
    $result = $conn->query($sql);
    $donors = [];
    while ($row = $result->fetch_assoc()) {
        $donors[] = $row;
    }
    return $donors;
}

function approve_donor($donor_id) {
    global $conn;
    $sql = "UPDATE donors SET approved = 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $donor_id);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}

function delete_donor($donor_id) {
    global $conn;
    $sql = "DELETE FROM donors WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $donor_id);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'get_donors':
            echo json_encode(get_donors());
            break;
        case 'get_unapproved_donors':
            echo json_encode(get_unapproved_donors());
            break;
        case 'approve_donor':
            $donor_id = sanitize_input($_POST['donor_id']);
            echo json_encode(['success' => approve_donor($donor_id)]);
            break;
        case 'delete_donor':
            $donor_id = sanitize_input($_POST['donor_id']);
            echo json_encode(['success' => delete_donor($donor_id)]);
            break;
        default:
            echo json_encode(['error' => 'Invalid action']);
    }
}

$conn->close();