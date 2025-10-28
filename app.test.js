const request = require('supertest');
const express = require('express');

// Create app instance for testing
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/evening', (req, res) => {
  res.send('Good evening');
});

describe('Express Server Endpoints', () => {
  test('GET / should return "Hello world"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello world');
  });

  test('GET /evening should return "Good evening"', async () => {
    const response = await request(app).get('/evening');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Good evening');
  });
});
