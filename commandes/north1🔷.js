const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInNorth1🔷 , getDataFromNorth1🔷} = require('../bdd/north1🔷')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'north1🔷',
        categorie : 'Fun'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromNorth1🔷();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if (s.MODE != "oui") {
            mode = "privé";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const north1🔷msg = `
*Proprietaire* : ${s.NOM_OWNER}
*Mode* : ${mode}
*Date* : ${date}
*Heure* : ${temps}

 ${message}
 
 
 *Zokou_MD version 2.0*`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: north1🔷msg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: north1🔷msg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(north1🔷msg);
    
}

    } else {
        if(!superUser) { repondre("ce fichier n'existe pas") ; return};

      await   repondre("ce fichier n'existe pas , voici comment l'enregistrer   ;\n tapez entrez apres north1🔷 votre message et votre lien image ou video dans ce contete : .alive message;lien");
         repondre(" j'espere vous avoir aider ")
     }
 } else {

    if(!superUser) { repondre ("Seul le proprietaire a le droit de modifier le fichier north1🔷") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInnorth1🔷(texte , tlien)

repondre('fichier north1🔷 actualiser avec succes')

}
    });
