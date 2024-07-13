import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import StudentDashboard from './components/StudentDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<StudentDashboard/>}></Route>
    </Routes>
    </>
  )
}

export default App
