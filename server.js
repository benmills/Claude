const http = require('http');
const fs = require('fs');
const path = require('path');
const localtunnel = require('localtunnel');

const PORT = 8080;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
};

// Create HTTP server
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start server
server.listen(PORT, async () => {
  console.log(`Local server running on http://localhost:${PORT}`);

  try {
    console.log('Creating tunnel...');
    const tunnel = await localtunnel({ port: PORT });

    console.log('\n========================================');
    console.log('✅ YOUR APP IS LIVE!');
    console.log('========================================');
    console.log(`\n📱 Open this URL on your phone:\n`);
    console.log(`   ${tunnel.url}`);
    console.log(`\n========================================\n`);

    tunnel.on('close', () => {
      console.log('Tunnel closed');
      process.exit(0);
    });
  } catch (err) {
    console.error('Error creating tunnel:', err.message);
    console.log(`\nLocal server still available at http://localhost:${PORT}`);
  }
});
