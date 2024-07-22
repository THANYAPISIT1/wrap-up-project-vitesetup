import './App.css'
import { Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Mainpage from './pages/Mainpage'

function App() {

  return (
    <div>
      <Routes>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='/' element={<Mainpage/>}/>
      </Routes>

    </div>
  )
}

export default App
