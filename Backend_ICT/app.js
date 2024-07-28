const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./db/dbConnect'); 

const projectRoutes = require('./routes/projectRoutes'); 
const princyRoutes = require('./routes/princyRoutes')
const salmanRoutes = require('./routes/salmanRoutes');


const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5175","http://localhost:5174","http://localhost:5176"], // Allow frontend origins
  methods: ["GET", "POST"],
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/projects', projectRoutes);
app.use('/princy', princyRoutes)
app.use('/salman', salmanRoutes);



app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});
