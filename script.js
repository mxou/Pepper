console.log("Démarrage");

const username = "mxou";
const fs = require("fs");
const path = require("path");

// ---DESTINATIONS---
const imgDestination = `C:/Users/${username}/Pictures`;
const docDestination = `C:/Users/${username}/Documents`;
const downloadPath = `C:/Users/${username}/Downloads`;
const downloadFile = fs.readdirSync(downloadPath);
const sourceFile = `C:/Users/${username}`;
const pepperPath = `C:/Users/${username}/PEPPER`;
// ---DESTINATIONS---

// ---INITIALISATION DE PEPPER---
if (!fs.existsSync(pepperPath)) {
  fs.mkdirSync(pepperPath);
  console.log("Dossier PEPPER créé avec succès");
} else {
  console.log("Dossier PEPPER déjà existant");
}

// Liste des sous-dossiers
const subFolders = ["PDFs", "Bin", "HTML", "TXT", "Quarantine"];

subFolders.forEach((folder) => {
  let fullPath = `C:/Users/${username}/PEPPER/${folder}`;

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
    console.log(`Dossier ${folder} créé avec succès`);
  }
});
// ---INITIALISATION DE PEPPER---

function isFileAllowed(stats, limitDays) {
  const now = Date.now();
  const creationDate = stats.birthtimeMs;
  const limit = limitDays * 24 * 60 * 60 * 1000; // x jours de limite

  //   if (now - creationDate > limite) {
  //     console.log("Fichier trop ancien donc ignoré");
  //   }

  return now - creationDate <= limit;
}

downloadFile.forEach((file) => {
  let fullPath = path.join(downloadPath, file);
  let stats = fs.statSync(fullPath);

  if (!isFileAllowed(stats, 30)) {
    // console.log("Ignoré : ", file);
    return;
  }

  //   console.log("OK : ", file);

  let ext = path.extname(file);
  if (ext === ".txt") {
    let newPath = path.join(docDestination, file);
    fs.renameSync(fullPath, newPath);
    // console.log(file, ext);
  }
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
