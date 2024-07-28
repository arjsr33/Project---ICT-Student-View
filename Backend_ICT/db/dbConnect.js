const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongoDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('DB is connected');
  })
  .catch((err) => {
    console.error('Error in connection!!!', err);
    process.exit(1);
  });
