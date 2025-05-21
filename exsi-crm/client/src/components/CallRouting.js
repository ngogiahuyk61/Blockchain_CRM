// client/src/components/CallRouting.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CallRouting.css";

const CallRouting = () => {
  const [rules, setRules] = useState([]);
  const [form, setForm] = useState({
    routeName: "",
    phoneNumber: "",
    forwardTo: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch rules on mount
  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const res = await axios.get("/api/callrouting");
      setRules(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Không tải được quy tắc phân phối.");
    }
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { routeName, phoneNumber, forwardTo } = form;
    if (!routeName || !phoneNumber || !forwardTo) {
      return setError("Vui lòng điền đầy đủ thông tin.");
    }
    try {
      if (editingId) {
        await axios.put(`/api/callrouting/${editingId}`, form);
      } else {
        await axios.post("/api/callrouting", form);
      }
      setForm({ routeName: "", phoneNumber: "", forwardTo: "" });
      setEditingId(null);
      setError("");
      fetchRules();
    } catch (err) {
      console.error(err);
      setError("Lưu quy tắc thất bại.");
    }
  };

  const handleEdit = rule => {
    setForm({
      routeName: rule.routeName,
      phoneNumber: rule.phoneNumber,
      forwardTo: rule.forwardTo
    });
    setEditingId(rule._id);
    setError("");
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/callrouting/${id}`);
      fetchRules();
    } catch (err) {
      console.error(err);
      setError("Xóa quy tắc thất bại.");
    }
  };

  const handleCancel = () => {
    setForm({ routeName: "", phoneNumber: "", forwardTo: "" });
    setEditingId(null);
    setError("");
  };

  return (
    <div className="call-routing">
      <h3>Phân phối cuộc gọi</h3>
      {error && <div className="error">{error}</div>}

      <form className="routing-form" onSubmit={handleSubmit}>
        <input
          name="routeName"
          type="text"
          placeholder="Tên quy tắc"
          value={form.routeName}
          onChange={handleChange}
        />
        <input
          name="phoneNumber"
          type="text"
          placeholder="Số nguồn"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <input
          name="forwardTo"
          type="text"
          placeholder="Chuyển đến"
          value={form.forwardTo}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? "Cập nhật" : "Thêm"}
        </button>
        {editingId && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Hủy
          </button>
        )}
      </form>

      <table className="routing-table">
        <thead>
          <tr>
            <th>Tên quy tắc</th>
            <th>Số nguồn</th>
            <th>Chuyển đến</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rules.map(rule => (
            <tr key={rule._id}>
              <td>{rule.routeName}</td>
              <td>{rule.phoneNumber}</td>
              <td>{rule.forwardTo}</td>
              <td>
                <button onClick={() => handleEdit(rule)}>Sửa</button>
                <button onClick={() => handleDelete(rule._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallRouting;
