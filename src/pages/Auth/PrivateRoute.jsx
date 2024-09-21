import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null สำหรับ loading, true/false สำหรับสถานะ login

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users', {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsAuthenticated(true); 
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
      return false;
    };

    checkAuth();
  }, []);

  // Loading state ขณะที่กำลังตรวจสอบการ login
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // หากไม่ login ให้ navigate ไปหน้า login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // หาก login แล้ว render ส่วนประกอบลูกที่อยู่ใน PrivateRoute
  return <Outlet />;
};

export default PrivateRoute;
