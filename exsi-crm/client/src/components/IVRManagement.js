// client/src/components/IVRManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IVRManagement.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const IVRManagement = () => {
  const [scripts, setScripts] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch all IVR scripts
  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const res = await axios.get(`${API_URL}/ivr`);
      setScripts(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được cấu hình IVR.");
    }
  };

  // Handle input change
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add or update script
  const handleSubmit = async e => {
    e.preventDefault();
    const { name, message } = form;
    if (!name || !message) {
      return setError("Vui lòng nhập tên và nội dung.");
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/ivr/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/ivr`, form);
      }
      setForm({ name: "", message: "" });
      setEditingId(null);
      fetchScripts();
      setError("");
    } catch {
      setError("Lưu kịch bản thất bại.");
    }
  };

  // Edit script
  const handleEdit = script => {
    setForm({ name: script.name, message: script.message });
    setEditingId(script._id);
    setError("");
  };

  // Delete script
  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/ivr/${id}`);
      fetchScripts();
    } catch {
      setError("Xóa kịch bản thất bại.");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({ name: "", message: "" });
    setEditingId(null);
    setError("");
  };

  return (
    <div className="ivr-management">
      <h3>Trả lời tự động (IVR)</h3>
      {error && <div className="error">{error}</div>}

      <form className="ivr-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên kịch bản"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Nội dung thông báo"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
        {editingId && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Hủy
          </button>
        )}
      </form>

      <table className="ivr-table">
        <thead>
          <tr>
            <th>Tên kịch bản</th>
            <th>Nội dung</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {scripts.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.message}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Sửa</button>
                <button onClick={() => handleDelete(s._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IVRManagement;
