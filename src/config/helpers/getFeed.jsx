// src/config/helpers/getFeed.jsx

import configAPI from '../services/ConfigAPI';

// Função para obter o feed principal
export const getFeed = async () => {
  try {
    const response = await configApi.get('/home', {
      headers: {
        "Authorization": process.env.EXPO_PUBLIC_API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching feed principal:', error);
    throw error;
  }
};