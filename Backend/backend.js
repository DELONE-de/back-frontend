// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000; 

app.use(cors());


app.use(express.json());

app.get('/api/message', (req, res) => {
  console.log('Received request for /api/message');
  res.json({ message: 'THIS IS MY TECH_CRUSH BACKEND!' });
});


app.listen(port, () => {
  console.log(`Express backend listening at http://localhost:${port}`);
});

