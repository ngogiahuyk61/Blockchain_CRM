// client/src/components/CustomerManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerManagement.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const CustomerManagement = ({ onSelect }) => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Lấy danh sách khách hàng khi load component
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/customers`);
      setCustomers(data);
      setMessage("");
    } catch (err) {
      setMessage("❌ Không tải được danh sách khách hàng.");
    }
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, phone } = form;
    if (!name || !email || !phone) {
      return setMessage("⚠️ Vui lòng điền đầy đủ thông tin.");
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/customers/${editingId}`, form);
        setMessage("✅ Cập nhật khách hàng thành công.");
      } else {
        await axios.post(`${API_URL}/customers`, form);
        setMessage("✅ Thêm khách hàng thành công.");
      }
      setForm({ name: "", email: "", phone: "" });
      setEditingId(null);
      fetchCustomers();
    } catch {
      setMessage("❌ Lưu khách hàng thất bại.");
    }
  };

  const handleEdit = customer => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone });
    setEditingId(customer._id);
    setMessage("");
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/customers/${id}`);
      setMessage("✅ Xóa khách hàng thành công.");
      fetchCustomers();
    } catch {
      setMessage("❌ Xóa khách hàng thất bại.");
    }
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", phone: "" });
    setEditingId(null);
    setMessage("");
  };

  return (
    <div className="customer-mgmt">
      <h3>Quản lý khách hàng</h3>
      {message && <div className="msg">{message}</div>}

      <form className="cust-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Họ và tên"
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
          placeholder="Điện thoại"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
        {editingId && (
          <button type="button" className="cancel" onClick={handleCancel}>
            Hủy
          </button>
        )}
      </form>

      <table className="cust-table">
        <thead>
          <tr>
            <th>Họ & Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c._id} onClick={() => onSelect && onSelect(c)}>
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

export default CustomerManagement;
