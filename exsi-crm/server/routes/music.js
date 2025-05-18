// routes/music.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('music'), (req, res) => {
  // Lưu file và cập nhật cấu hình nhạc chờ
  res.json({ message: 'Tải lên thành công' });
});

module.exports = router;
