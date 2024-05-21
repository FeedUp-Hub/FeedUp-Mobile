import { useState, useEffect } from 'react';
import { getFeed } from '../helpers/getFeed';
import { getProfile } from '../helpers/getProfile';
import { submitForm } from '../helpers/submitForm';
import { submitMood } from '../helpers/submitMood';
import { submitComment } from '../helpers/submitComment';

// Hook para obter o feed principal
export const useFeed = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const response = await getFeed();
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return { data, error, loading, fetchFeed };
};

// Hook para obter o perfil do usuário
export const useProfile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await getProfile();
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { data, error, loading, fetchProfile };
};

// Hook para enviar o formulário
export const useSubmitForm = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const doSubmitForm = async (formData) => {
    setLoading(true);
    try {
      const response = await submitForm(formData);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, doSubmitForm };
};

// Hook para enviar o mood do usuário
export const useSubmitMood = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const doSubmitMood = async (moodData) => {
    setLoading(true);
    try {
      const response = await submitMood(moodData);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, doSubmitMood };
};

// Hook para enviar um comentário
export const useSubmitComment = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const doSubmitComment = async (commentData) => {
    setLoading(true);
    try {
      const response = await submitComment(commentData);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, doSubmitComment };
};
