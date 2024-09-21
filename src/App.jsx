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
import Mainpage from './pages/Mainpage'


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
          <Route path="/note" element={<NotePage />} />
          <Route path='test' element={<TestPage/>}/>
          <Route path='/archive' element={<Archive/>} />
          <Route path='/summary' element={<Summary/>} />
          <Route path='/summary/:SID' element={<SummaryDetail/>} />
          <Route path='/trash' element={<Trash/>} />
          <Route path='/main' element={<Mainpage/>}></Route>
        {/* </Route> */}
      </Routes>

    </div>
  )
}

export default App
