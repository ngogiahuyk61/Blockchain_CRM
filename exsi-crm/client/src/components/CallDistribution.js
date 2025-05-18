import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CallDistribution.css";

const CallDistribution = () => {
  const [rules, setRules] = useState([]);
  const [form, setForm] = useState({
    routeName: "",
    phoneNumber: "",
    forwardTo: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Lấy danh sách rules từ server
  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/callrouting");
      setRules(res.data);
    } catch (err) {
      console.error(err);
      setError("Không tải được quy tắc phân phối.");
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.routeName || !form.phoneNumber || !form.forwardTo) {
      return setError("Vui lòng điền đầy đủ thông tin.");
    }
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/callrouting/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/callrouting", form);
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
    setForm({ routeName: rule.routeName, phoneNumber: rule.phoneNumber, forwardTo: rule.forwardTo });
    setEditingId(rule._id);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/callrouting/${id}`);
      fetchRules();
    } catch (err) {
      console.error(err);
      setError("Xóa quy tắc thất bại.");
    }
  };

  return (
    <div className="call-distribution">
      <h3>Phân phối cuộc gọi</h3>
      {error && <div className="error">{error}</div>}

      <form className="distribution-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="routeName"
          placeholder="Tên quy tắc"
          value={form.routeName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Số điện thoại gốc"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="forwardTo"
          placeholder="Chuyển tiếp đến"
          value={form.forwardTo}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? "Cập nhật" : "Thêm quy tắc"}
        </button>
      </form>

      <div className="rules-list">
        <h4>Danh sách quy tắc</h4>
        {rules.length === 0 ? (
          <p>Chưa có quy tắc nào.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Số gốc</th>
                <th>Chuyển tiếp</th>
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
        )}
      </div>
    </div>
  );
};

export default CallDistribution;
