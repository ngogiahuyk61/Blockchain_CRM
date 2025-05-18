// routes/ivr.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { script } = req.body;
  // Lưu script vào cơ sở dữ liệu hoặc file
  saveIVRScript(script);
  res.json({ message: 'Cập nhật thành công' });
});

module.exports = router;
