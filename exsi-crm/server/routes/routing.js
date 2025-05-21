// routes/routing.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { rules } = req.body;
  // Lưu rules vào cơ sở dữ liệu
  res.json({ message: 'Lưu thành công' });
});

module.exports = router;
