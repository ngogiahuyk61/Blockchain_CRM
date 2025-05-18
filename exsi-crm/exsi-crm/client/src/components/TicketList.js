import React from 'react';

const TicketList = ({ tickets }) => {
  return (
    <div>
      <h2>Danh sách phiếu hỗ trợ</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>{ticket.subject}</strong> - {ticket.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
