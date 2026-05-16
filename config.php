<?php
session_start();
$admin_pass = "admin123"; // GANTI PASSWORD INI!

try {
    $db = new PDO('sqlite:database.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->exec("CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        thumbnail TEXT,
        embed_url TEXT,
        views INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

function auth() {
    if (!isset($_SESSION['logged_in'])) {
        header('Location: admin.php?login');
        exit;
    }
}
?>