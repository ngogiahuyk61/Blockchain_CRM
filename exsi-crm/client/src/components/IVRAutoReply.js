import React, { useState, useEffect } from "react";
import axios from "axios";
import "./IVRAutoReply.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const IVRAutoReply = () => {
  const [configs, setConfigs] = useState([]);        // danh sách cấu hình IVR
  const [form, setForm] = useState({                // form thêm/sửa
    key: "",
    message: ""
  });
  const [editingId, setEditingId] = useState(null); // nếu đang edit thì chứa _id
  const [previewKey, setPreviewKey] = useState(""); // phím để xem preview
  const [error, setError] = useState("");
  const [previewMsg, setPreviewMsg] = useState("");

  // Fetch configs khi component mount
  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const res = await axios.get(`${API_URL}/ivr-auto`);
      setConfigs(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được cấu hình IVR.");
    }
  };

  // Xử lý thay đổi input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Thêm hoặc cập nhật cấu hình
  const handleSubmit = async e => {
    e.preventDefault();
    const { key, message } = form;
    if (!key || !message) {
      return setError("Vui lòng nhập phím và thông điệp.");
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/ivr-auto/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/ivr-auto`, form);
      }
      setForm({ key: "", message: "" });
      setEditingId(null);
      fetchConfigs();
      setError("");
    } catch {
      setError("Lưu cấu hình thất bại.");
    }
  };

  // Bắt đầu sửa
  const handleEdit = cfg => {
    setForm({ key: cfg.key, message: cfg.message });
    setEditingId(cfg._id);
    setError("");
  };

  // Xóa cấu hình
  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/ivr-auto/${id}`);
      fetchConfigs();
    } catch {
      setError("Xóa cấu hình thất bại.");
    }
  };

  // Hủy thao tác edit
  const handleCancel = () => {
    setForm({ key: "", message: "" });
    setEditingId(null);
    setError("");
  };

  // Xem trước phản hồi khi bấm phím
  const handlePreview = () => {
    const cfg = configs.find(c => c.key === previewKey);
    setPreviewMsg(cfg ? cfg.message : "Không có cấu hình cho phím này");
  };

  return (
    <div className="ivr-auto-reply">
      <h3>Trả lời tự động (IVR) — Auto Reply</h3>
      {error && <div className="error">{error}</div>}

      <form className="ivr-form" onSubmit={handleSubmit}>
        <input
          name="key"
          placeholder="Phím (ví dụ: 1)"
          value={form.key}
          onChange={handleChange}
        />
        <input
          name="message"
          placeholder="Thông điệp trả lời"
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
            <th>Phím</th>
            <th>Thông điệp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {configs.map(cfg => (
            <tr key={cfg._id}>
              <td>{cfg.key}</td>
              <td>{cfg.message}</td>
              <td>
                <button onClick={() => handleEdit(cfg)}>Sửa</button>
                <button onClick={() => handleDelete(cfg._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ivr-preview">
        <h4>Xem trước IVR</h4>
        <input
          placeholder="Nhập phím để thử"
          value={previewKey}
          onChange={e => setPreviewKey(e.target.value)}
        />
        <button onClick={handlePreview}>Thử</button>
        {previewMsg && <p className="preview-msg">{previewMsg}</p>}
      </div>
    </div>
  );
};

export default IVRAutoReply;
