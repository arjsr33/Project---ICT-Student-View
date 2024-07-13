import React from 'react';
import { Route, Routes } from 'react-router-dom'

import StudentDashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';

function App() {

  <Navbar/>
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
