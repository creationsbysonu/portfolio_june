const fs = require('fs');
const lottie = {
  v: "5.5.2",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Pharmacy Cross",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Cross",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [50, 50, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: {
          a: 1,
          k: [
            { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 0, s: [100, 100, 100] },
            { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 30, s: [115, 115, 100] },
            { t: 60, s: [100, 100, 100] }
          ],
          ix: 6
        }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [24, 72], ix: 2 },
              p: { a: 0, k: [0, 0], ix: 3 },
              r: { a: 0, k: 0, ix: 4 },
              nm: "Rectangle Path 1",
              hd: false
            },
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [72, 24], ix: 2 },
              p: { a: 0, k: [0, 0], ix: 3 },
              r: { a: 0, k: 0, ix: 4 },
              nm: "Rectangle Path 2",
              hd: false
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.13, 0.77, 0.36, 1], ix: 4 },
              o: { a: 0, k: 100, ix: 5 },
              r: 1,
              bm: 0,
              nm: "Fill 1",
              hd: false
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0], ix: 2 },
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              r: { a: 0, k: 0, ix: 6 },
              o: { a: 0, k: 100, ix: 7 },
              sk: { a: 0, k: 0, ix: 4 },
              sa: { a: 0, k: 0, ix: 5 },
              nm: "Transform"
            }
          ],
          nm: "Group 1",
          np: 3,
          cix: 2,
          bm: 0,
          hd: false
        }
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }
  ]
};
fs.writeFileSync('public/lottie-pharmacy.json', JSON.stringify(lottie));
console.log('Pharmacy Lottie generated!');
