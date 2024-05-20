// src/config/configApi.jsx

import axios from 'axios';

const configApi = axios.create({
  baseURL: 'https://9b1a-2804-5d0-8105-4f00-2dcc-c777-68ee-a971.ngrok-free.app',
  headers: {
    "Content-Type": 'application/json',
    "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMjlkM2Y5OC1kODY2LTQyOTctYmZlNC05ODViMjQyNDE1ZjUiLCJ1c2VybmFtZSI6IkFuYSBMYXVyYSIsImVtYWlsIjoiYW5hQGlvYXN5cy5jb20iLCJuYW1lIjoiQW5hIExhdXJhIEdvbnRpam8iLCJyb2xlIjoidGVzdGUiLCJjb2luIjoyMTAwLCJpYXQiOjE3MTYxNTMyMDQsImV4cCI6MTcxNjE4OTIwNH0.9p4UaMEzNLwNUeB2k31gHo9fN7L6298TprbQjWrp9Ew',
  }
});

export default configApi;
