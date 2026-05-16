<?php include 'config.php'; 
$query = $db->query("SELECT * FROM videos ORDER BY created_at DESC");
$videos = $query->fetchAll(PDO::FETCH_ASSOC);

$current_video = null;
if (isset($_GET['v'])) {
    $stmt = $db->prepare("SELECT * FROM videos WHERE id = ?");
    $stmt->execute([$_GET['v']]);
    $current_video = $stmt->fetch(PDO::FETCH_ASSOC);
    // Update views
    $db->prepare("UPDATE videos SET views = views + 1 WHERE id = ?")->execute([$_GET['v']]);
} elseif (!empty($videos)) {
    $current_video = $videos[0];
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>StreamHub Pro - Premium Video</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background: #0b0f19; color: #e5e7eb; }
        .aspect-video { position: relative; padding-bottom: 56.25%; height: 0; }
        .aspect-video iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
    </style>
</head>
<body>
    <nav class="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-50">
        <div class="container mx-auto flex justify-between items-center">
            <a href="index.php" class="text-2xl font-black text-blue-500 tracking-tighter">STREAM<span class="text-white">HUB</span></a>
            <a href="admin.php" class="text-xs text-gray-600 hover:text-gray-400">Admin</a>
        </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
        <?php if ($current_video): ?>
        <div class="mb-10">
            <div class="bg-black rounded-xl overflow-hidden shadow-2xl">
                <div class="aspect-video">
                    <iframe src="<?= $current_video['embed_url'] ?>" allowfullscreen></iframe>
                </div>
            </div>
            <div class="mt-4">
                <h1 class="text-2xl font-bold"><?= htmlspecialchars($current_video['title']) ?></h1>
                <p class="text-gray-400"><?= number_format($current_video['views']) ?> views • <?= $current_video['created_at'] ?></p>
            </div>
        </div>
        <?php endif; ?>

        <h2 class="text-lg font-bold mb-6 flex items-center">
            <span class="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span> Koleksi Terbaru
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <?php foreach ($videos as $v): ?>
            <a href="index.php?v=<?= $v['id'] ?>" class="group block">
                <div class="relative rounded-lg overflow-hidden bg-gray-800 aspect-video mb-2">
                    <img src="<?= htmlspecialchars($v['thumbnail']) ?>" class="w-full h-full object-cover group-hover:scale-110 transition duration-300">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition">
                        <svg class="w-12 h-12 text-white opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                    </div>
                </div>
                <h3 class="font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition"><?= htmlspecialchars($v['title']) ?></h3>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>