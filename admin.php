<?php include 'config.php';

if (isset($_GET['login'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['pass'] == $admin_pass) {
        $_SESSION['logged_in'] = true;
        header('Location: admin.php');
    }
    echo '<form method="POST" style="margin:100px auto; width:300px; text-align:center;">
          <input type="password" name="pass" placeholder="Password" style="padding:10px; width:100%"><br><br>
          <button type="submit" style="padding:10px; width:100%">Login</button></form>';
    exit;
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
}

auth();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add'])) {
    $stmt = $db->prepare("INSERT INTO videos (title, thumbnail, embed_url) VALUES (?, ?, ?)");
    $stmt->execute([$_POST['title'], $_POST['thumb'], $_POST['url']]);
}

if (isset($_GET['delete'])) {
    $stmt = $db->prepare("DELETE FROM videos WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    header('Location: admin.php');
}

$videos = $db->query("SELECT * FROM videos ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
        <div class="flex justify-between mb-8">
            <h1 class="text-2xl font-bold">Manage Videos</h1>
            <a href="admin.php?logout" class="text-red-500">Logout</a>
        </div>

        <form method="POST" class="bg-white p-6 rounded shadow-md mb-8">
            <div class="grid grid-cols-1 gap-4">
                <input type="text" name="title" placeholder="Video Title" class="border p-2 w-full" required>
                <input type="text" name="thumb" placeholder="Thumbnail URL" class="border p-2 w-full" required>
                <input type="text" name="url" placeholder="Embed URL (e.g. Doodstream Embed Link)" class="border p-2 w-full" required>
                <button type="submit" name="add" class="bg-blue-600 text-white p-2 rounded">Add Video</button>
            </div>
        </form>

        <table class="w-full bg-white rounded shadow">
            <thead><tr class="bg-gray-200 text-left"><th class="p-3">Title</th><th class="p-3">Views</th><th class="p-3">Action</th></tr></thead>
            <tbody>
                <?php foreach($videos as $v): ?>
                <tr class="border-b">
                    <td class="p-3"><?= htmlspecialchars($v['title']) ?></td>
                    <td class="p-3"><?= $v['views'] ?></td>
                    <td class="p-3"><a href="admin.php?delete=<?= $v['id'] ?>" class="text-red-600" onclick="return confirm('Hapus?')">Delete</a></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>