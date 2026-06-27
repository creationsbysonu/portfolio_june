const https = require('https');

https.get('https://lordicon.com/icons', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search for "cart" or "microphone" inside the page HTML/JSON
    const cartMatches = data.match(/([a-z0-9]{8})\.json/g);
    console.log("Found matches:", cartMatches ? cartMatches.slice(0, 10) : "none");
  });
});
