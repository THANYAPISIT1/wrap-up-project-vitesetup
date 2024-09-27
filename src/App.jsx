import { Routes,Route,Navigate } from 'react-router-dom'
import NotePage from './pages/Note/NotePage'
import TestPage from './Test/TestPage'
import Archive from './pages/Archive/ArchivePage'
import Trash from './pages/Trash/TrashPage'
import Summary from './pages/Summary/SummaryPage'
import SummaryDetail from './pages/Summary/SummaryDetail'
import MainRoutes from './pages/MainRoutes'
import ProtectedRoute from './Auth/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginRegister/LoginPage'

const API_URL = import.meta.env.VITE_API_URL;
console.log('API URL:', API_URL);

function App() {


  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<TestPage />} />
        <Route path='/' element={<MainRoutes/>}>

          <Route path='/' element={<Navigate to="/note" replace />}/>
          <Route path="/note" element={<ProtectedRoute><NotePage /></ProtectedRoute>} />
          <Route path='/archive' element={<ProtectedRoute><Archive /></ProtectedRoute>} />
          <Route path='/summary' element={<ProtectedRoute><Summary /></ProtectedRoute>} />
          <Route path='/summary/:SID' element={<ProtectedRoute><SummaryDetail /></ProtectedRoute>} />
          <Route path='/trash' element={<ProtectedRoute><Trash /></ProtectedRoute>} />
          
        </Route>
        <Route path="*" element={<Navigate to="/pagenotfound" replace />} />
        <Route path="/pagenotfound" element={<NotFoundPage/>}/>
        <Route path='test' element={<TestPage/>}/>
      </Routes>

    </div>
  )
}

export default App
