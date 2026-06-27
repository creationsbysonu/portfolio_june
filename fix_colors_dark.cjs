const fs = require('fs');

// Fetch the original file so we start fresh from the blue version
const https = require('https');

https.get('https://fonts.gstatic.com/s/e/notoemoji/latest/1f5e3/lottie.json', (res) => {
  let rawData = '';
  res.on('data', chunk => rawData += chunk);
  res.on('end', () => {
    let data = JSON.parse(rawData);
    
    // Use a dark, near-black color to contrast with the light card background
    // [r, g, b, alpha] normalized to 0-1
    const accentColor = [0.1, 0.1, 0.1, 1]; // dark grey/black

    function traverse(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
      } else if (obj !== null && typeof obj === 'object') {
        if (obj.ty === 'fl' || obj.ty === 'st') {
          if (obj.c && obj.c.k && Array.isArray(obj.c.k) && obj.c.k.length === 4 && typeof obj.c.k[0] === 'number') {
            obj.c.k = accentColor;
          }
        } else if (obj.ty === 'gr' && obj.g && obj.g.k && obj.g.k.k && Array.isArray(obj.g.k.k)) {
            let k = obj.g.k.k;
            for (let i = 0; i < k.length; i += 4) {
                if (i+3 < k.length) {
                    k[i+1] = accentColor[0];
                    k[i+2] = accentColor[1];
                    k[i+3] = accentColor[2];
                }
            }
        }
        
        if (obj.ty === 'fl' || obj.ty === 'st') {
            if (obj.c && obj.c.k && Array.isArray(obj.c.k) && obj.c.k.length > 0 && typeof obj.c.k[0] === 'object') {
                obj.c.k.forEach(kf => {
                    if (kf.s && Array.isArray(kf.s) && kf.s.length === 4) {
                        kf.s = accentColor;
                    }
                    if (kf.e && Array.isArray(kf.e) && kf.e.length === 4) {
                        kf.e = accentColor;
                    }
                });
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
    fs.writeFileSync('public/lottie-speaking.json', JSON.stringify(data));
    console.log("Colors updated to dark grey/black.");
  });
});
