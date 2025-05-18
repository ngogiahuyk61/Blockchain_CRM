// client/src/components/InternalCalls.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InternalCalls.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const InternalCalls = () => {
  const [entries, setEntries] = useState([]);          // danh sách máy nhánh
  const [form, setForm] = useState({ name: "", extension: "" });
  const [callingExt, setCallingExt] = useState(null);  // đang gọi đến extension nào
  const [message, setMessage] = useState("");          // thông báo trạng thái

  // Lấy danh sách khi component mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${API_URL}/internal-calls`);
      setEntries(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Không tải được máy nhánh nội bộ.");
    }
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleAdd = async e => {
    e.preventDefault();
    const { name, extension } = form;
    if (!name || !extension) {
      return setMessage("Vui lòng điền đủ tên và máy nhánh.");
    }
    try {
      await axios.post(`${API_URL}/internal-calls`, form);
      setForm({ name: "", extension: "" });
      setMessage("Thêm máy nhánh thành công.");
      fetchEntries();
    } catch {
      setMessage("Thêm máy nhánh thất bại.");
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${API_URL}/internal-calls/${id}`);
      setMessage("Xóa máy nhánh thành công.");
      fetchEntries();
    } catch {
      setMessage("Xóa máy nhánh thất bại.");
    }
  };

  const handleCall = ext => {
    setCallingExt(ext);
    setMessage(`Đang gọi nội bộ đến máy nhánh #${ext}...`);
    setTimeout(() => {
      setCallingExt(null);
      setMessage("");
    }, 3000);
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
          placeholder="Máy nhánh"
          value={form.extension}
          onChange={handleChange}
        />
        <button type="submit">Thêm</button>
      </form>

      <table className="internal-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Nhánh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.extension}</td>
              <td>
                <button
                  onClick={() => handleCall(e.extension)}
                  disabled={callingExt === e.extension}
                >
                  {callingExt === e.extension ? "Đang gọi..." : "Gọi"}
                </button>
                <button onClick={() => handleDelete(e._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternalCalls;
