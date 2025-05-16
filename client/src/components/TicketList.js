import React, { useEffect, useState } from "react";
import axios from "axios";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ subject: "", description: "", status: "Open" });

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy phiếu hỗ trợ:", error);
      }
    };

    fetchTickets();
  }, []);

  // Add new ticket
  const handleAddTicket = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/tickets", newTicket);
      setTickets([...tickets, response.data]);
      setNewTicket({ subject: "", description: "", status: "Open" });
    } catch (error) {
      console.error("Lỗi khi thêm phiếu hỗ trợ:", error);
    }
  };

  return (
    <div className="ticket-list">
      <h2>Danh sách phiếu hỗ trợ</h2>

      <div className="add-ticket">
        <input
          type="text"
          placeholder="Chủ đề"
          value={newTicket.subject}
          onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={newTicket.description}
          onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
        />
        <button onClick={handleAddTicket}>Thêm Phiếu Hỗ Trợ</button>
      </div>

      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            {ticket.subject} - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
