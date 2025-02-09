<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $hla_type = sanitize_input($_GET['hlaType']);

    $sql = "SELECT id, name, email, hla_type FROM donors WHERE hla_type = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $hla_type);
    $stmt->execute();
    $result = $stmt->get_result();

    $donors = [];
    while ($row = $result->fetch_assoc()) {
        $donors[] = $row;
    }

    echo json_encode($donors);

    $stmt->close();
}

$conn->close();