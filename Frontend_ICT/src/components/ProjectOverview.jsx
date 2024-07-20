import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Box, Grid } from '@mui/material';
import axios from 'axios';
import './projectOverview.css'; 


function ProjectOverview() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        console.log('Projects fetched:', response.data);
        if (Array.isArray(response.data)) {
          setProjects(response.data);
          if (response.data.length > 0) {
            setSelectedProject(response.data[0]);
            setSelectedProjectId(response.data[0]._id);
            updateBackgroundImage(response.data[0].backgroundImage);
          }
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      updateBackgroundImage(selectedProject.backgroundImage);
    }
  }, [selectedProject]);

  const updateBackgroundImage = (image) => {
    document.body.style.backgroundImage = `url(/images/${image})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  };

  const handleSelectionChange = (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId);
    const project = projects.find(p => p._id === projectId);
    setSelectedProject(project);
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box my={4} style={{ width: '120%' }} className="selector-box">
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
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedProject && (
        <Grid container spacing={2} style={{ width: '120%' }}>
          <Grid item xs={12}>
            <Box mt={2} style={{ width: '100%', height: '650px' }}>
              <iframe
                src={selectedProject.project_url.replace('/view?usp=sharing', '/preview')}
                width="100%"
                height="110%"
                title="Project Overview Document"
                style={{ border: 'none' }}
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ProjectOverview;
