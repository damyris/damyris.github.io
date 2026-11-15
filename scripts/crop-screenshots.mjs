// One-off: crop the owner's study-app screenshots (inbox/, not committed)
// down to the app itself, so no browser tabs, address bar or dock show.
import sharp from 'sharp';

const crops = [
  ['inbox/study-tool-home.webp', 'src/assets/study-app/home.webp', { left: 465, top: 185, width: 1071, height: 572 }],
  ['inbox/study-tool-blind-spots.webp', 'src/assets/study-app/blind-spots.webp', { left: 465, top: 175, width: 1071, height: 1020 }],
  ['inbox/study-tool-question.webp', 'src/assets/study-app/question.webp', { left: 465, top: 160, width: 1071, height: 1035 }],
];

for (const [src, out, box] of crops) {
  await sharp(src).extract(box).webp({ quality: 85 }).toFile(out);
  console.log(`${out} ← ${src}`);
}
