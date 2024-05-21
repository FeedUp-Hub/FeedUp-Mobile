import { useState } from 'react';
import { loginAcc } from '../helpers/loginAcc';

const useAuth = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const authenticate = async (username, password) => {
    setLoading(true);
    try {
      const response = await login(username, password);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, authenticate };
};

export default useAuth;
