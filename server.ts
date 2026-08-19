import express from 'express';
import next from 'next';
import renderReelHandler from './api/render-reel.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

app.prepare().then(() => {
  const server = express();
  
  server.post('/api/render-reel', express.json({ limit: '50mb' }), (req, res) => {
    return renderReelHandler(req, res);
  });

  server.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
