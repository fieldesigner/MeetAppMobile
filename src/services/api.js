import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.15:3334', // ipv4 do wifi
});

export default api;
