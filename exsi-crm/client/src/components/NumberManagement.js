// components/NumberManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NumberManagement = () => {
  const [numbers, setNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios.get('/api/numbers')
      .then(response => setNumbers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAdd = () => {
    axios.post('/api/numbers', { number: newNumber })
      .then(response => {
        setNumbers([...numbers, response.data]);
        setNewNumber('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Kết nối đầu số</h2>
      <ul>
        {numbers.map(num => (
          <li key={num.id}>{num.number}</li>
        ))}
      </ul>
      <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
      <button onClick={handleAdd}>Thêm đầu số</button>
    </div>
  );
};

export default NumberManagement;
