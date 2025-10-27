// Express.js server with multiple endpoints
const express = require('express');
const app = express();

const port = 3000;

// Endpoint 1: Returns "Hello world"
// Purpose: Fulfill the baseline requirement for a hello world endpoint
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Endpoint 2: Returns "Good evening"
// Purpose: Add the requested second endpoint per user requirements
app.get('/evening', (req, res) => {
  res.send('Good evening');
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
