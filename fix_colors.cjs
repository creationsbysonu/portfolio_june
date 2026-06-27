const fs = require('fs');
let data = JSON.parse(fs.readFileSync('public/lottie-speaking.json', 'utf8'));

// The portfolio's accent color seems to be a warm gold/yellow or white. Let's make it a nice soft white/off-white.
const accentColor = [0.9, 0.9, 0.9, 1]; // off-white

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
    } else if (obj.k && Array.isArray(obj.k) && obj.k.length === 4 && typeof obj.k[0] === 'number') {
       // Sometimes colors are directly inside k array
       // Only replace if they look like normalized rgb colors (all <= 1) and not bounding boxes.
       if (obj.k[0] <= 1 && obj.k[1] <= 1 && obj.k[2] <= 1 && obj.k[3] <= 1) {
          // obj.k = accentColor;
       }
    }
    
    // Some Lottie files have color keyframes, where obj.c.k is an array of objects
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
      if (key !== 'c' || (obj.ty !== 'fl' && obj.ty !== 'st')) { // Already handled c.k above
         traverse(obj[key]);
      }
    }
  }
}

traverse(data);
fs.writeFileSync('public/lottie-speaking.json', JSON.stringify(data));
console.log("Colors updated to off-white.");
