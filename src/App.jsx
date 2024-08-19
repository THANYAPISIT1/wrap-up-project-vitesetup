import './App.css'
import { Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginRegister/LoginPage'
import Mainpage from './pages/Mainpage'
import RegisterPage from './pages/LoginRegister/RegisterPage'
import TestPage from './TestPage'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios'

function App() {
  const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Make a request to a protected endpoint to check if the user is authenticated
          await axios.get("http://localhost:8000/protected-endpoint", {
            withCredentials: true,
          });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        }
      };

      checkAuth();
    }, [navigate]);

    return <>{children}</>;
  };

  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="*"
          element={
            <ProtectedRoutes>
              <Routes>
                <Route path='/' element={<Mainpage/>}/>
                <Route path='test' element={<TestPage/>}/>
              </Routes>
            </ProtectedRoutes>
          }
        />
      </Routes>

    </div>
  )
}

export default App
