import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'  // hoặc URL deploy
});

export default api;
