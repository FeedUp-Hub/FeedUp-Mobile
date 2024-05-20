// src/config/hooks/useApi.js

import { useState, useEffect } from 'react';
import { getFeed } from '../helpers/getFeed';

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
