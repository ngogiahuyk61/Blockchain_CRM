// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Tạo contact mới
router.post('/', contactController.createContact);

// Lấy danh sách contacts
router.get('/', contactController.getContacts);

module.exports = router;
