// controllers/ticketController.js
const Ticket = require('../models/ticketModel');
const Contact = require('../models/contactModel');

// Tạo mới ticket
exports.createTicket = async (req, res) => {
  try {
    const { contactId, subject, description } = req.body;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact không tồn tại' });
    }
    const ticket = await Ticket.create({ contact: contactId, subject, description });
    return res.status(201).json(ticket);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả ticket
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('contact', 'name email phone');
    return res.json(tickets);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Lấy ticket theo ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('contact', 'name email phone');
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket không tìm thấy' });
    }
    return res.json(ticket);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Cập nhật ticket
exports.updateTicket = async (req, res) => {
  try {
    const { status, description } = req.body;
    const updateData = {};
    if (description !== undefined) updateData.description = description;
    if (status) {
      updateData.status = status;
      if (status === 'closed') updateData.closedAt = Date.now();
    }
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket không tìm thấy' });
    }
    return res.json(ticket);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Xóa ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket không tìm thấy' });
    }
    return res.json({ message: 'Xóa ticket thành công' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};