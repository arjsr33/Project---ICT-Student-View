const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./db/dbConnect'); 

const projectRoutes = require('./routes/projectRoutes'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});
