import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import VivaVoce from './VivaVoce';
import DiscussionForum from './DiscussionForum';
import Home from './Home';  // Import the Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vivavoce" element={<VivaVoce />} />
        <Route path="/discussionforum" element={<DiscussionForum />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;



