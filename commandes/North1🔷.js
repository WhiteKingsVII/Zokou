const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInNorth1🔷 , getDataFromNorth1🔷} = require('../bdd/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'North1🔷',
        categorie : 'Général'
        
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
      
    

    const north1🔷msg = `

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
        if(!superUser) { repondre("il n'a pas de North1🔷 pour ce bot") ; return};

      await   repondre("Vous n'avez pas encore enregistrer votre North1🔷 , pour ce faire ;\n tapez entrez apres North1🔷 votre message et votre lien image ou video dans ce contete : .North1🔷 message;lien");
         repondre(" je prend mon temps pour t'expliquer ; gars a toi si tu fait faux")
     }
 } else {

    if(!superUser) { repondre ("Seul le proprietaire a le droit de modifier le North1🔷") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInNorth1🔷(texte , tlien)

repondre('message North1🔷 actualiser avec succes')

}
    });￼Enter
