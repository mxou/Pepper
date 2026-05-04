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
  let pdfPath = `C:/Users/${username}/PEPPER/PDFs`;
  if (!fs.existsSync(pdfPath)) {
    fs.mkdirSync(pdfPath);
    console.log("Dossier PDFs crée avec succès");
  } else {
    console.log("Erreur lors de la création du dossier PDFs");
  }
  let binPath = `C:/Users/${username}/PEPPER/Bin`;
  if (!fs.existsSync(binPath)) {
    fs.mkdirSync(binPath);
    console.log("Dossier Bin crée avec succès");
  } else {
    console.log("Erreur lors de la création du dossier Bin");
  }
} else {
  console.log("Dossier PEPPER déja existant");
}
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
