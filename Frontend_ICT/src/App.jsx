import React from 'react';
import { Route, Routes } from 'react-router-dom';

import StudentDashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';
import ProjectOverview from './components/ProjectOverview';
import WeeklySubmission from './components/WeeklySubmission';
import BasicFileUpload from './components/BasicFileUpload';
import ProjectDashboard1 from './components/ProjectDashboard1';
import ProjectDashboard2 from './components/ProjectDashboard2';
import Detail from './components/StudentDashboard2';
import Signup from './components/Signup';
import Login from './components/Login';
import VivaVoce from './components/VivaVoce';
import DiscussionForum from './components/DiscussionForum';
import Home from './components/Home';  // Import the Home component
import WeeklyReference from './components/Ref';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentDashboard" element={<StudentDashboard />}></Route>
          <Route path="/projectDashboard1" element={<ProjectDashboard1 s_id='S0001' />} />
          <Route path="/ref" element={<WeeklyReference />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/projectDashboard2" element={<ProjectDashboard2 />} />
          <Route path="/weeklySubmission" element={<WeeklySubmission s_id='S0001' />} />
          <Route path="/overview" element={<ProjectOverview />} />
          <Route path="/vivavoce" element={<VivaVoce />} />
          <Route path="/discussionforum" element={<DiscussionForum />} />
        
        {/* Add other routes here if needed */}
      </Routes>
    </div>
  );
}

export default App;
