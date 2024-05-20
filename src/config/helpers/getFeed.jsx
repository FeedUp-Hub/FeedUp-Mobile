// src/config/helpers/getFeed.jsx

import configApi from '../configApi';

// Função para obter o feed principal
export const getFeed = async () => {
  try {
    const response = await configApi.get('/home');
    return response.data;
  } catch (error) {
    console.error('Error fetching feed principal:', error);
    throw error;
  }
};
