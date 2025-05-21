// routes/numbers.js
const express = require('express');
const router = express.Router();
const Number = require('../models/numberModel'); // Đảm bảo bạn đã định nghĩa mô hình Number

// Lấy danh sách tất cả các số
router.get('/', async (req, res) => {
  try {
    const numbers = await Number.find();
    res.json(numbers);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách số điện thoại' });
  }
});

// Thêm số mới
router.post('/', async (req, res) => {
  try {
    const { number } = req.body;
    if (!number) {
      return res.status(400).json({ message: 'Số điện thoại là bắt buộc' });
    }

    const newNumber = new Number({ number });
    await newNumber.save();
    res.status(201).json(newNumber);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm số điện thoại mới' });
  }
});

module.exports = router;
