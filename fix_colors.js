const fs = require('fs');
let data = JSON.parse(fs.readFileSync('public/lottie-speaking.json', 'utf8'));

// Recursively find and replace color arrays. In Lottie, color arrays are usually found under a key "k" which is an array of 4 numbers,
// inside an object with "ty": "fl" (fill) or "ty": "st" (stroke), or sometimes just arrays of 4 numbers where the first 3 are colors.
// Since the emoji is mostly blue, we can just replace ALL 4-element arrays where the values are between 0 and 1, to make it monochrome or gold.
// A safer way is to traverse and look for "c" -> "k" which is the color array.

function traverse(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(traverse);
  } else if (obj !== null && typeof obj === 'object') {
    if (obj.ty === 'fl' || obj.ty === 'st') {
      if (obj.c && obj.c.k && Array.isArray(obj.c.k) && obj.c.k.length === 4 && typeof obj.c.k[0] === 'number') {
        // Change color to white (1,1,1,1)
        obj.c.k = [1, 1, 1, 1];
      }
    } else if (obj.ty === 'gr' && obj.g && obj.g.k && obj.g.k.k && Array.isArray(obj.g.k.k)) {
        // Gradient colors are arrays of [stop, r, g, b, stop, r, g, b...]
        let k = obj.g.k.k;
        for (let i = 0; i < k.length; i += 4) {
            if (i+3 < k.length) {
                // Keep stop, change rgb to white
                k[i+1] = 1;
                k[i+2] = 1;
                k[i+3] = 1;
            }
        }
    }
    for (let key in obj) {
      traverse(obj[key]);
    }
  }
}

traverse(data);
fs.writeFileSync('public/lottie-speaking.json', JSON.stringify(data));
console.log("Colors updated to white.");
