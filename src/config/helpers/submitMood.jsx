import configApi from '../services/ConfigAPI';

// Função para enviar o mood do usuário
export const submitMood = async (moodData) => {
  try {
    const response = await configApi.post('/moods', moodData);
    return response.data;
  } catch (error) {
    console.error('Error submitting mood:', error);
    throw error;
  }
};
