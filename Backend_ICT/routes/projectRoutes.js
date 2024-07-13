const express = require('express');
const router = express.Router();
const projectData = require('../model/projectData'); 

router.get('/', async (req, res) => {
  try {
    const projects = await projectData.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
