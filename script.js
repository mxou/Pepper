console.log("Démarrage");

const username = "mxou";
const fs = require("fs");
const path = require("path");

// ---DESTINATIONS---
const imgDestination = `C:/Users/${username}/Pictures`;
const docDestination = `C:/Users/${username}/Documents`;
const videoDestination = `C:/Users/${username}/Videos`;
const downloadPath = `C:/Users/${username}/Downloads`;
const downloadFile = fs.readdirSync(downloadPath);
const sourceFile = `C:/Users/${username}`;
const pepperPath = `C:/Users/${username}/PEPPER`;
const pdfPepperPath = `C:/Users/${username}/PEPPER/PDFs`;
const binPepperPath = `C:/Users/${username}/PEPPER/Bin`;
const htmlPepperPath = `C:/Users/${username}/PEPPER/HTML`;
const txtPepperPath = `C:/Users/${username}/PEPPER/TXT`;
const reviewPepperPath = `C:/Users/${username}/PEPPER/Review`;
const codePepperPath = `C:/Users/${username}/PEPPER/Code`;
const logsPath = `C:/Users/${username}/PEPPER/logs.txt`;
// ---DESTINATIONS---

function getDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `[${day}/${month}/${year} ${hours}:${minutes}:${seconds}]`;
}

// ---INITIALISATION DE PEPPER---
if (!fs.existsSync(pepperPath)) {
  fs.mkdirSync(pepperPath);
  console.log("Dossier PEPPER créé avec succès");
} else {
  console.log("Dossier PEPPER déjà existant");
}

if (!fs.existsSync(logsPath)) {
  fs.writeFileSync(logsPath, `${getDateTime()} Programme PEPPER initialisé\n`);
  console.log("Fichier logs crée avec succès");
}

// Liste des sous-dossiers
const subFolders = ["PDFs", "Bin", "HTML", "TXT", "Review", "Code"];

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

  return now - creationDate <= limit;
}

function addLog(task) {
  fs.appendFileSync(logsPath, `${getDateTime()} ${task}`);
}

// ---ANALYSE DU DOSSIER TELECHARGEMENTS---
downloadFile.forEach((file) => {
  let start = performance.now();
  let fullPath = path.join(downloadPath, file);
  let stats = fs.statSync(fullPath);

  if (!isFileAllowed(stats, 30)) {
    return;
  }

  let ext = path.extname(file).toLowerCase();
  if (ext === ".txt") {
    let newPath = path.join(txtPepperPath, file);
    fs.renameSync(fullPath, newPath);
    console.log(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
    addLog(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
  } else if (ext === ".jpg" || ext === ".jpeg" || ext === ".webp" || ext === ".png" || ext === ".svg") {
    let newPath = path.join(imgDestination, file);
    fs.renameSync(fullPath, newPath);
    console.log(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
    addLog(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
  } else if (ext === ".pdf") {
    let newPath = path.join(pdfPepperPath, file);
    fs.renameSync(fullPath, newPath);
    console.log(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
    addLog(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
  } else if (ext === ".mp3" || ext === ".mp4" || ext === ".avi" || ext === ".webm") {
    let newPath = path.join(videoDestination, file);
    fs.renameSync(fullPath, newPath);
    console.log(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
    addLog(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
  } else if (
    ext === ".css" ||
    ext === ".sql" ||
    ext === ".js" ||
    ext === ".html" ||
    ext === ".php" ||
    ext === ".md" ||
    ext === ".json" ||
    ext === ".xml" ||
    ext === ".py"
  ) {
    let newPath = path.join(codePepperPath, file);
    fs.renameSync(fullPath, newPath);
    console.log(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
    addLog(`Fichier : ${file} déplacé avec succès dans le dossier ${newPath}`);
    let end = performance.now();
    console.log(`Protocole réalisé en ${start - end}ms`);
    addLog(`Protocole réalisé en ${start - end}ms`);
  }
});
// ---ANALYSE DU DOSSIER TELECHARGEMENTS---

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
