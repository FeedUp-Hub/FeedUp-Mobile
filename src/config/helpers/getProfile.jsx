// src/config/helpers/getProfile.jsx

import configApi from '../configApi';

// Função para obter o perfil do usuário
export const getProfile = async () => {
  try {
    const response = await configApi.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
