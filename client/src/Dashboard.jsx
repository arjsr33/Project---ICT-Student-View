import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.dashboard}>
      <h1>Project Dashboard</h1>
      <div style={styles.links}>
        <Link to="/vivavoce" style={styles.link}>Viva Voce</Link>
        <Link to="/discussionforum" style={styles.link}>Discussion Forum</Link>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    padding: '20px',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
  },
};

export default Dashboard;
