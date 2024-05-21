import configApi from '../services/ConfigAPI';

// Função para enviar o formulário
export const submitForm = async (formData) => {
  try {
    const response = await configApi.post('/formulario', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};
