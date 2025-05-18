import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TicketList from '../components/TicketList';

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get('/tickets')
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Trang Phiếu Hỗ Trợ</h1>
      <TicketList tickets={tickets} />
    </div>
  );
};

export default TicketsPage;
