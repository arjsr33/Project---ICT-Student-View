import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControlLabel, Checkbox, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';
import './ProjectDetails.css'; 
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function ProjectDetails() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Initialize useLocation to access state
  const { studentData } = location.state || {}; // Destructure studentData from state

  console.log(`Project id is ${id}`);
  console.log('Student data passed as state:', studentData); // Log studentData

  useEffect(() => {
    axios.get(`http://localhost:5000/arjun/projects/${id}`)
      .then(response => {
        console.log('Projects fetched:', response.data); 
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProject(response.data[0]);
          setSelectedProjectId(response.data[0].id); // Use the project ID instead of _id
        }
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, [id]);

  const handleAcceptanceChange = (event) => {
    setIsAccepted(event.target.checked);
  };

  const handleSelectAndProceed = () => {
    if (isAccepted) {
      const confirmed = window.confirm('Are you sure you want to select this project? Once selected, you cannot change it.');
      if (confirmed) {
        console.log('Proceeding with project:', selectedProject.name);
        updateStudentProject(); // Call the function to update the student project
      }
    } else {
      alert('Please accept the terms to proceed.');
    }
  };

  const updateStudentProject = () => {
    axios.put(`http://localhost:5000/princy/updateStudentProject/${studentData.s_id}`, { p_id: selectedProjectId })
      .then(response => {
        console.log('Student project updated:', response.data);
        goToProjectDashboard(); // Call the function to navigate after updating the project
      })
      .catch(error => {
        console.error('Error updating student project:', error);
      });
  };

  const goToProjectDashboard = () => {
    navigate('/ProjectDashboard1', { state: { s_id: studentData.s_id, p_id: selectedProjectId } }); // Redirect to Project Dashboard route with s_id and p_id in state
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth={false}
        className="dashboard-container"
        style={{ backgroundImage: `url(${selectedProject ? `/images/${selectedProject.backgroundImage}` : ''})` }}
      >
        {selectedProject && (
          <Grid container spacing={2} className="project-details">
            <Grid item xs={12} md={2}>
              <Card className="prerequisite-card">
                <CardContent>
                  <Typography variant="h6">Prerequisite Knowledge</Typography>
                  <ul>
                    {selectedProject.prerequisiteKnowledge.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card className="details-card">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {selectedProject.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedProject.details}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Overview:
                  </Typography>
                  {selectedProject.overview && Array.isArray(selectedProject.overview) ? (
                    selectedProject.overview.map((paragraph, index) => (
                      <Typography key={index} variant="body1" paragraph>
                        {paragraph}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body1" paragraph>
                      No overview available.
                    </Typography>
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAccepted}
                        onChange={handleAcceptanceChange}
                        name="acceptTerms"
                      />
                    }
                    label="I accept that once selected I cannot change the project in future"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: '8px' }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSelectAndProceed}
                      disabled={!isAccepted}
                    >
                      Select and Proceed
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={2}>
              <Card className="job-opportunities-card">
                <CardContent>
                  <Typography variant="h6">Job Opportunities</Typography>
                  <ul>
                    {selectedProject.jobOpportunities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default ProjectDetails;
