import axios from 'axios';

const ConfigAPI = axios.create({
  baseURL: 'https://9770-2804-5d0-8111-ec00-8c6c-7194-bbe0-6799.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
     "ngrok-skip-browser-warning": "skip-browser-warning"
  },
});

export default ConfigAPI;
