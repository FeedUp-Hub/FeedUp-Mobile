// src/config/helpers/submitComment.jsx

import configApi from '../services/ConfigAPI';

// Função para enviar um comentário
export const submitComment = async (commentData) => {
  try {
    const response = await configApi.post('/comments', commentData);
    return response.data;
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
};
