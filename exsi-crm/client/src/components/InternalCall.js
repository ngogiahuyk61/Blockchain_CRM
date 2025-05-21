import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InternalCalls.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const InternalCalls = () => {
  const [users, setUsers] = useState([]);         // danh sách user
  const [form, setForm] = useState({ name: "", extension: "" });
  const [callingId, setCallingId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch list of internal users/extensions
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/internal-calls`);
      setUsers(res.data);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Không tải được danh sách nội bộ.");
    }
  };

  // Handle form field change
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add new internal extension/user
  const handleAdd = async e => {
    e.preventDefault();
    const { name, extension } = form;
    if (!name || !extension) {
      return setMessage("⚠️ Vui lòng điền tên và máy nhánh.");
    }
    try {
      await axios.post(`${API_URL}/internal-calls`, form);
      setForm({ name: "", extension: "" });
      fetchUsers();
      setMessage("✅ Thêm thành công.");
    } catch {
      setMessage("❌ Thêm thất bại.");
    }
  };

  // Delete an extension
  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/internal-calls/${id}`);
      fetchUsers();
      setMessage("✅ Xóa thành công.");
    } catch {
      setMessage("❌ Xóa thất bại.");
    }
  };

  // Mock call action
  const handleCall = id => {
    setCallingId(id);
    setMessage(`☎️ Đang gọi nội bộ tới máy nhánh #${id}...`);
    // reset after 3s
    setTimeout(() => setCallingId(null), 3000);
  };

  return (
    <div className="internal-calls">
      <h3>Gọi nội bộ miễn phí</h3>
      {message && <div className="msg">{message}</div>}

      <form className="internal-form" onSubmit={handleAdd}>
        <input
          name="name"
          placeholder="Tên nhân viên"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="extension"
          placeholder="Số nhánh"
          value={form.extension}
          onChange={handleChange}
        />
        <button type="submit">Thêm máy nhánh</button>
      </form>

      <table className="internal-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Máy nhánh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.extension}</td>
              <td>
                <button 
                  onClick={() => handleCall(u.extension)}
                  disabled={callingId === u.extension}
                >
                  {callingId === u.extension ? "Đang gọi..." : "Gọi"}
                </button>
                <button onClick={() => handleDelete(u._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternalCalls;
