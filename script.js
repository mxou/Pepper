console.log("Démarrage");

const username = "mxou";
const fs = require("fs");
const path = require("path");
const downloadFile = `C:/Users/${username}/Downloads`;

const fichier = fs.readdirSync(downloadFile);

console.log(fichier);
