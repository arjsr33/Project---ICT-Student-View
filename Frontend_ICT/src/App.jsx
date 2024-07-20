import React from 'react';
import { Route, Routes } from 'react-router-dom';

import StudentDashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';
import ProjectOverview from './components/ProjectOverview';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/overview" element={<ProjectOverview />} />
      </Routes>
    </div>
  );
}

export default App;
