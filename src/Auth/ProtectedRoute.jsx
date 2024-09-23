import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [hasToken, setHasToken] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL; // Use your environment variable

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/token`, { withCredentials: true });
        setHasToken(response.data.hasToken);
      } catch (error) {
        setHasToken(false);
      }
    };

    checkToken();
  }, [apiUrl]);

  // If still loading, you can return null or a loading spinner
  if (hasToken === null) return null;

  return hasToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;