import './App.css'
import { Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginRegister/LoginPage'
import Mainpage from './pages/Mainpage'
import RegisterPage from './pages/LoginRegister/RegisterPage'
import TestPage from './TestPage'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Mainpage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='test' element={<TestPage/>}/>
      </Routes>

    </div>
  )
}

export default App
