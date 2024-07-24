import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import StudentDashboard from './components/StudentDashboard'
// import Home from './components/Home/Home'
import Navbar from './components/Nav/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import WeeklyReference from './components/Ref/Ref'
import Home from './components/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Navbar/> */}
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/StudentDashboard' element={<StudentDashboard/>}></Route>
      <Route path='/reference' element={<WeeklyReference/>}></Route>

    </Routes>
    </>
  )
}

export default App
