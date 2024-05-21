import configApi from '../services/ConfigAPI';

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
