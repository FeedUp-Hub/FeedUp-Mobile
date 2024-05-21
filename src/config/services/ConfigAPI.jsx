import axios from 'axios';

const ConfigAPI = axios.create({
  baseURL: 'https://07be-2804-5d0-8105-4f00-3515-5817-d424-bf3e.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
     "ngrok-skip-browser-warning": "skip-browser-warning"
  },
});

export default ConfigAPI;
