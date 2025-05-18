// client/src/components/AudioFileGeneration.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AudioFileGeneration.css";

const AudioFileGeneration = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  // Lấy danh sách file từ server
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/audio-files");
      setFiles(res.data);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách file.");
    }
  };

  // Xử lý upload file
  const handleUpload = async () => {
    if (!file) return setError("Vui lòng chọn file trước khi upload.");
    const formData = new FormData();
    formData.append("audio", file);

    try {
      await axios.post("http://localhost:5000/api/audio-files", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFile(null);
      setError("");
      fetchFiles();
    } catch (err) {
      console.error(err);
      setError("Upload thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="audio-file-gen">
      <h3>Tạo file âm thanh</h3>
      {error && <div className="error">{error}</div>}

      <div className="upload-section">
        <input
          type="file"
          accept="audio/*"
          onChange={e => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload Audio</button>
      </div>

      <div className="file-list">
        <h4>Danh sách file</h4>
        {files.length === 0 && <p>Chưa có file nào.</p>}
        <ul>
          {files.map(f => (
            <li key={f._id} className="file-item">
              <span>{f.originalName}</span>
              <audio controls src={`http://localhost:5000/${f.path}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AudioFileGeneration;
