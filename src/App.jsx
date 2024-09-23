import './App.css'
import { Routes,Route,Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginRegister/LoginPage'
import NotePage from './pages/Note/NotePage'
import RegisterPage from './pages/LoginRegister/RegisterPage'
import TestPage from './TestPage'
import Archive from './pages/Archive/ArchivePage'
import Trash from './pages/Trash/TrashPage'
import Summary from './pages/Summary/SummaryPage'
import SummaryDetail from './pages/Summary/SummaryDetail'
import MainRoutes from './pages/MainRoutes'
import ProtectedRoute from './Auth/ProtectedRoute'

const API_URL = import.meta.env.VITE_API_URL;
console.log('API URL:', API_URL);

function App() {


  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path='/' element={<MainRoutes/>}>

          <Route path='/' element={<Navigate to="/note" replace />}/>
          <Route path="/note" element={<ProtectedRoute><NotePage /></ProtectedRoute>} />
          <Route path='/archive' element={<ProtectedRoute><Archive /></ProtectedRoute>} />
          <Route path='/summary' element={<ProtectedRoute><Summary /></ProtectedRoute>} />
          <Route path='/summary/:SID' element={<ProtectedRoute><SummaryDetail /></ProtectedRoute>} />
          <Route path='/trash' element={<ProtectedRoute><Trash /></ProtectedRoute>} />
          
          <Route path='test' element={<TestPage/>}/>
        </Route>
      </Routes>

    </div>
  )
}

export default App
