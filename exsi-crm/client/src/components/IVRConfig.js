// client/src/components/IVRConfig.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IVRConfig.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const IVRConfig = () => {
  const [scripts, setScripts] = useState([]);         // danh sách kịch bản
  const [form, setForm] = useState({ name: "", steps: "" }); // steps là JSON string mô tả flow
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Khi mount, fetch các kịch bản từ server
  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const res = await axios.get(`${API_URL}/ivr-config`);
      setScripts(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được cấu hình IVR."); 
    }
  };

  // Bắt sự kiện nhập liệu form
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Thêm hoặc cập nhật kịch bản
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.steps) {
      return setError("Vui lòng nhập tên và steps.");
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/ivr-config/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/ivr-config`, form);
      }
      setForm({ name: "", steps: "" });
      setEditingId(null);
      fetchScripts();
      setError("");
    } catch {
      setError("Lưu cấu hình thất bại.");
    }
  };

  // Chuyển sang chế độ edit
  const handleEdit = script => {
    setForm({ name: script.name, steps: JSON.stringify(script.steps, null, 2) });
    setEditingId(script._id);
    setError("");
  };

  // Xóa kịch bản
  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/ivr-config/${id}`);
      fetchScripts();
    } catch {
      setError("Xóa kịch bản thất bại.");
    }
  };

  // Hủy edit
  const handleCancel = () => {
    setForm({ name: "", steps: "" });
    setEditingId(null);
    setError("");
  };

  return (
    <div className="ivr-config">
      <h3>Cấu hình IVR</h3>
      {error && <div className="error">{error}</div>}

      <form className="ivr-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên kịch bản"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="steps"
          placeholder='Nhập JSON steps, ví dụ [{"key":"1","message":"Chào mừng"}]'
          value={form.steps}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
        {editingId && (
          <button type="button" className="cancel" onClick={handleCancel}>
            Hủy
          </button>
        )}
      </form>

      <table className="ivr-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Steps (JSON)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {scripts.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>
                <pre>{JSON.stringify(s.steps, null, 2)}</pre>
              </td>
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

export default IVRConfig;
