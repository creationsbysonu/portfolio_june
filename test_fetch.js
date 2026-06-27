import https from 'https';
import fs from 'fs';

const options = {
  headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
};

// Microphone / Audio
https.get('https://assets8.lottiefiles.com/packages/lf20_UoNfB9.json', options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('public/lottie-stutter.json', data);
    console.log("Stutter downloaded, length:", data.length);
  });
});

// E-commerce cart
https.get('https://assets3.lottiefiles.com/packages/lf20_1p9xixmb.json', options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('public/lottie-cart.json', data);
    console.log("Cart downloaded, length:", data.length);
  });
});
