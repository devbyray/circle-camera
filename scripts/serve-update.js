import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/latest.json') {
    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');
    
    // Read and serve the latest.json file
    const filePath = path.join(rootDir, 'latest.json');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Error reading latest.json' }));
        return;
      }
      res.statusCode = 200;
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ Update server running at http://localhost:${PORT}`);
  console.log(`   Test your updater by accessing http://localhost:${PORT}/latest.json`);
  console.log(`   Press Ctrl+C to stop the server`);
});