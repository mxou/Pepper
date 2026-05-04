console.log("Démarrage");

const username = "mxou";

function isFileAllowed(stats, limitDays) {
  const now = Date.now();
  const creationDate = stats.birthtimeMs;
  const limit = limitDays * 24 * 60 * 60 * 1000; // x jours de limite

  //   if (now - creationDate > limite) {
  //     console.log("Fichier trop ancien donc ignoré");
  //   }

  return now - creationDate <= limit;
}

// ---DESTINATIONS---
const pngDestination = `C:/Users/${username}/Pictures/pngs`;
const jpgDestination = `C:/Users/${username}/Pictures/jpgs`;
const webpDestination = `C:/Users/${username}/Pictures/webps`;
// ---DESTINATIONS---

const fs = require("fs");
const path = require("path");
const downloadPath = `C:/Users/${username}/Downloads`;
const downloadFile = fs.readdirSync(downloadPath);

downloadFile.forEach((file) => {
  let fullPath = path.join(downloadPath, file);
  let stats = fs.statSync(fullPath);

  if (!isFileAllowed(stats, 30)) {
    console.log("Ignoré : ", file);
    return;
  }

  console.log("OK : ", file);
});

// const buddyContent = fs.readFile(buddy);

// console.log(buddyContent);

// fs.readFile(`C:/Users/${username}/Downloads/alwaysdata.txt`, "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Lecture du fichier txt : ", data);
// });

// fs.stat(`C:/Users/${username}/Downloads/slt.txt`, (err, stats) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(stats);
//   }
// });

// const fichier = fs.readdirSync(downloadFile);

// console.log(fichier);
