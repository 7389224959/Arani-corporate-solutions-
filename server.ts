import express from 'express';
import next from 'next';
import renderReelHandler from './api/render-reel.js';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  
  server.post('/api/render-reel', express.json({ limit: '50mb' }), (req, res) => {
    return renderReelHandler(req, res);
  });

  server.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  server.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
