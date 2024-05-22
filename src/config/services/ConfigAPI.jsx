import axios from 'axios';

const ConfigAPI = axios.create({
  baseURL: 'https://c52f-2804-5d0-8111-ec00-f99e-2a93-8ee0-f0d3.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
     "ngrok-skip-browser-warning": "skip-browser-warning"
  },
});

export default ConfigAPI;