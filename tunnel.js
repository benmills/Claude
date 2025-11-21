const localtunnel = require('localtunnel');

(async () => {
  try {
    const tunnel = await localtunnel({ port: 8080 });
    console.log('Your app is now publicly accessible at:');
    console.log(tunnel.url);
    console.log('\nOpen this URL on your phone to view the app!');
    console.log('Press Ctrl+C to stop the tunnel');

    tunnel.on('close', () => {
      console.log('Tunnel closed');
      process.exit(0);
    });
  } catch (err) {
    console.error('Error creating tunnel:', err);
    process.exit(1);
  }
})();
