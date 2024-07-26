import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import StudentDashboard from './components/StudentDashboard'
import WeeklySubmission from './components/WeeklySubmission'
import BasicFileUpload from './components/BasicFileUpload'
import ProjectDashboard1 from './components/ProjectDashboard1'
import ProjectDashboard2 from './components/ProjectDashboard2'
import FinalProjectSubmission from './components/FinalProjectSubmission'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<StudentDashboard s_id='S0001'/>}></Route>
      <Route path='ProjectDashboard1' element={<ProjectDashboard1 s_id='S0001'/>}></Route>
      <Route path='ProjectDashboard2' element={<ProjectDashboard2/>}></Route>
      <Route path='/WeeklySubmission' element={<WeeklySubmission />}></Route>
      <Route path='/FinalProjectSubmission' element={<FinalProjectSubmission/>}></Route>

    </Routes>
    </>
  )
}

export default App
