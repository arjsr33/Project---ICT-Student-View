import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Initialize navigate

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/home')
      .then(result => {
        console.log(result);
        if (result.data !== "Success") {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  return (
    <div>
      <h2>Home Component</h2>
    </div>
  );
}

export default Home;

