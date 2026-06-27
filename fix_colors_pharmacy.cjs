const fs = require('fs');
const https = require('https');

https.get('https://fonts.gstatic.com/s/e/notoemoji/latest/1f48a/lottie.json', (res) => {
  let rawData = '';
  res.on('data', chunk => rawData += chunk);
  res.on('end', () => {
    let data = JSON.parse(rawData);
    
    // Use a soft white/gold to match the other icons
    const accentColor = [0.96, 0.67, 0.04, 1]; // Gold/yellowish from the theme, or off-white [0.9, 0.9, 0.9, 1]
    const mainColor = [0.9, 0.9, 0.9, 1];

    function traverse(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
      } else if (obj !== null && typeof obj === 'object') {
        if (obj.ty === 'fl' || obj.ty === 'st') {
          if (obj.c && obj.c.k && Array.isArray(obj.c.k) && obj.c.k.length === 4 && typeof obj.c.k[0] === 'number') {
            obj.c.k = mainColor;
          }
        } else if (obj.ty === 'gr' && obj.g && obj.g.k && obj.g.k.k && Array.isArray(obj.g.k.k)) {
            let k = obj.g.k.k;
            for (let i = 0; i < k.length; i += 4) {
                if (i+3 < k.length) {
                    k[i+1] = mainColor[0];
                    k[i+2] = mainColor[1];
                    k[i+3] = mainColor[2];
                }
            }
        }
        
        for (let key in obj) {
          if (key !== 'c' || (obj.ty !== 'fl' && obj.ty !== 'st')) {
             traverse(obj[key]);
          }
        }
      }
    }

    traverse(data);
    fs.writeFileSync('public/lottie-pharmacy.json', JSON.stringify(data));
    console.log("Pharmacy Lottie downloaded and recolored.");
  });
});
