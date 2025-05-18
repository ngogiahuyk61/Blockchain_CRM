// client/src/components/ContactList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactList.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const ContactList = ({ onSelect }) => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_URL}/contacts`);
      setContacts(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách liên hệ.");
    }
  };

  // Handle form change
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add or update contact
  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, phone } = form;
    if (!name || !email || !phone) {
      return setError("Vui lòng điền đầy đủ thông tin.");
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/contacts/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/contacts`, form);
      }
      setForm({ name: "", email: "", phone: "" });
      setEditingId(null);
      fetchContacts();
    } catch (err) {
      console.error(err);
      setError("Lưu liên hệ thất bại.");
    }
  };

  // Edit contact
  const handleEdit = contact => {
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
    setEditingId(contact._id);
    setError("");
  };

  // Delete contact
  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error(err);
      setError("Xóa liên hệ thất bại.");
    }
  };

  return (
    <div className="contact-list">
      <h3>Quản lý khách hàng</h3>
      {error && <div className="error">{error}</div>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Tên"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          type="text"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
        {editingId && (
          <button type="button" className="cancel-btn" onClick={() => {
            setForm({ name: "", email: "", phone: "" });
            setEditingId(null);
            setError("");
          }}>
            Hủy
          </button>
        )}
      </form>

      <table className="contacts-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id} onClick={() => onSelect && onSelect(c._id)}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={e => { e.stopPropagation(); handleEdit(c); }}>Sửa</button>
                <button onClick={e => { e.stopPropagation(); handleDelete(c._id); }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
