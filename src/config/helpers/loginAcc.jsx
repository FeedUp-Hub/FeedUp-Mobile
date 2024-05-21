// src/config/helpers/login.jsx

import configApi from '../services/ConfigAPI';

// Função para autenticar o login
export const loginAcc = async (username, password) => {
  try {
    const response = await configApi.post('/', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
