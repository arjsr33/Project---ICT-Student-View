const express = require('express');
const router = express.Router();
const Project = require('../model/projectData'); // Ensure the path to the project model is correct

// Fetch all projects
router.get('/', async (req, res) => { // This route handles GET requests to /api/projects
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// Fetch a single project by ID
router.get('/:id', async (req, res) => { // This route handles GET requests to /api/projects/:id
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
});

module.exports = router;
