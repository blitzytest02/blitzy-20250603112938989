import { createServer } from 'node:http';

const HOST = '127.0.0.1';
const PORT = 3000;

const ROUTES = new Map([
  ['/hello', 'Hello world'],
  ['/hello-world', 'Hello world'],
  ['/good-evening', 'Good evening'],
]);

const server = createServer((req, res) => {
  const body = ROUTES.get(req.url);

  if (body === undefined) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(body);
});

server.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});
