import './App.css'
import { Routes,Route,Navigate } from 'react-router-dom'
// import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginRegister/LoginPage'
import Mainpage from './pages/Mainpage'
import RegisterPage from './pages/LoginRegister/RegisterPage'
import TestPage from './TestPage'
import Archive from './pages/Archive/ArchivePage'
import Trash from './pages/Trash/TrashPage'
import Summary from './pages/Summary/SummaryPage'


const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);

function App() {


  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path='/' element={<Navigate to="/note" replace />}/>
          <Route path="/note" element={<Mainpage />} />
          <Route path='test' element={<TestPage/>}/>
          <Route path='/archive' element={<Archive/>} />
          <Route path='/summary' element={<Summary/>} />
          <Route path='/trash' element={<Trash/>} />
        {/* </Route> */}
      </Routes>

    </div>
  )
}

export default App
