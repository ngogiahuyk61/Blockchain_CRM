import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerList.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const CustomerList = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/customers`);
      setCustomers(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách khách hàng.");
    }
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, phone } = form;
    if (!name || !email || !phone) {
      return setError("Vui lòng điền đầy đủ thông tin.");
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/customers/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/customers`, form);
      }
      setForm({ name: "", email: "", phone: "" });
      setEditingId(null);
      fetchCustomers();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Lưu khách hàng thất bại.");
    }
  };

  const handleEdit = customer => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone });
    setEditingId(customer._id);
    setError("");
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error(err);
      setError("Xóa khách hàng thất bại.");
    }
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", phone: "" });
    setEditingId(null);
    setError("");
  };

  return (
    <div className="customer-list">
      <h3>Quản lý khách hàng</h3>
      {error && <div className="error">{error}</div>}

      <form className="customer-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
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
          type="text"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
        {editingId && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Hủy
          </button>
        )}
      </form>

      <table className="customers-table">
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
            <tr key={c._id} onClick={() => onSelectCustomer && onSelectCustomer(c)}>
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

export default CustomerList;
