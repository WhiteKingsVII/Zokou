const {zokou} = require("../framework/zokou") ;
const s = require("../set")


zokou ( { nomCom : "deploy",
         categorie : "heroku"} , async (dest,zk,commandeOptions) => {


  const {arg , ms , repondre }= commandeOptions ;
 const { exec } = require('child_process');
const Heroku = require('heroku-client');

const SESSION_ID = arg.join(" ");
const PREFIXE = '.';
const NOM_OWNER = 'MDL';
const NOM_BOT = 'Luffy';
const LIENS_IMAGE = 'https://i.pinimg.com/564x/fb/14/c3/fb14c321e7ed3abc21746266fe88fe7d.jpg';
const HEROKU_APP_NAME = generateRandomAppName();

// Commande pour cloner le dépôt GitHub
const cloneCommand = 'git clone https://github.com/djalega8000/Zokou-2.0';

// Fonction pour générer un nom aléatoire pour l'application Heroku
function generateRandomAppName() {
  const staticPart = 'myapp'; // Partie statique du nom
  const randomPart = Math.random().toString(36).substring(2, 8); // Partie aléatoire

  return `${staticPart}-${randomPart}`;
}

// Utilisation de la fonction pour obtenir un nom aléatoire
const randomAppName = generateRandomAppName();
console.log(randomAppName);



// Commandes pour mettre à jour les variables dans le code
const updateCommands = [
  `sed -i 's/SESSION_ID =/SESSION_ID = "${SESSION_ID}"/' zokou-md/leFichier.js`,
  `sed -i 's/PREFIXE =/PREFIXE = "${PREFIXE}"/' zokou-md/leFichier.js`,
  `sed -i 's/NOM_OWNER =/NOM_OWNER = "${NOM_OWNER}"/' zokou-md/leFichier.js`,
  `sed -i 's/NOM_BOT =/NOM_BOT = "${NOM_BOT}"/' zokou-md/leFichier.js`,
  `sed -i 's/LIENS_IMAGE =/LIENS_IMAGE = "${LIENS_IMAGE}"/' zokou-md/leFichier.js`,
];

// Fonction pour déployer sur Heroku
async function deployToHeroku() {
  const heroku = new Heroku({ token: "0347264b-a178-4f99-85b0-ff62e645e33c" });

  // Clonage du dépôt GitHub
  exec(cloneCommand, async (cloneError, cloneStdout, cloneStderr) => {
    if (cloneError) {
   reprondre(`Erreur lors du clonage : ${cloneError}`);
      return;
    }

    // Mettre à jour les variables dans le code
    for (const command of updateCommands) {
      await execCommand(command);
    }

    // Commit et push des modifications vers Heroku
    await execCommand('git init && git add . && git commit -m "Mise à jour des variables"');
    await execCommand(`git remote add heroku https://git.heroku.com/${HEROKU_APP_NAME}.git`);
    await execCommand('git push heroku master');

 repondre('Déploiement sur Heroku terminé avec succès.');
  });
}

// Fonction utilitaire pour exécuter des commandes
function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Appel de la fonction de déploiement
deployToHeroku();

  
 
  
         })
       
