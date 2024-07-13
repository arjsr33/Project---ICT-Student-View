import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Box, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';

function StudentDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProject(response.data[0]);
          setSelectedProjectId(response.data[0].id);
        }
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const handleSelectionChange = (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId);
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  const handleAcceptanceChange = (event) => {
    setIsAccepted(event.target.checked);
  };

  const handleSelectAndProceed = () => {
    if (isAccepted) {
      const confirmed = window.confirm('Are you sure you want to select this project? Once selected, you cannot change it.');
      if (confirmed) {
        console.log('Proceeding with project:', selectedProject.name);
      }
    } else {
      alert('Please accept the terms to proceed.');
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Student Dashboard
        </Typography>
        <Box my={4} style={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="project-select-label">Select Project</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={selectedProjectId}
              label="Select Project"
              onChange={handleSelectionChange}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {selectedProject && (
          <Grid container spacing={2} style={{ width: '100%' }}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                {selectedProject.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                {selectedProject.details}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                {selectedProject.overview}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                Reference Materials:
              </Typography>
              <ul>
                {selectedProject.referenceMaterials.map((material, index) => (
                  <li key={index}>
                    Week {material.week}: {material.material}
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                Weekly Submission Format: {selectedProject.weeklySubmissionFormat}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                Final Report Format: {selectedProject.finalReportFormat}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                Viva Voce Format: {selectedProject.vivaVoceFormat}
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default StudentDashboard;
