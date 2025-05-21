// controllers/contactController.js

const Contact = require('../models/contactModel');

// Tạo contact mới
exports.createContact = async (req, res) => {
  try {
    // req.body đã được parse JSON bởi express.json()
    const contact = new Contact(req.body);
    // Lưu vào MongoDB
    await contact.save();  // Mongoose save() đảm bảo validation và middleware :contentReference[oaicite:0]{index=0}
    return res.status(201).json(contact);  // res.json() tự đặt Content-Type: application/json :contentReference[oaicite:1]{index=1}
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Lấy danh sách contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
