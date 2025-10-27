// Basic Node.js HTTP server
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Single endpoint implementation using native http module
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
