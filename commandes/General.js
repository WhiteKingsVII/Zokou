const { zokou } = require("../framework/zokou");
const {getAllSudoNumbers,isSudoTableNotEmpty} = require("../bdd/sudo")
const conf = require("../set");

zokou({ nomCom: "proprio", categorie: "Général", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms , mybotpic } = commandeOptions;
    
  const thsudo = await isSudoTableNotEmpty()

  if (thsudo) {
     let msg = `*Zokou Super-User*\n
     *Numero proprietaire\n* :
- 🌟 @${conf.NUMERO_OWNER}

------ *Autre sudos* -----\n`
     
 let sudos = await getAllSudoNumbers()

   for ( const sudo of sudos) {
    if (sudo) { // Vérification plus stricte pour éliminer les valeurs vides ou indéfinies
      sudonumero = sudo.replace(/[^0-9]/g, '');
      msg += `- 💼 @${sudonumero}\n`;
    } else {return}

   }   const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
   const mentionedJid = sudos.concat([ownerjid])
   console.log(sudos);
   console.log(mentionedJid)
      zk.sendMessage(
        dest,
        {
          image : { url : 'https://furansujapon.com/wp-content/uploads/2023/03/Saitama-dans-One-Punch-Man-1052x592.jpg'},
          caption : msg,
          mentions : mentionedJid
        }
      )
  } else {
    const vcard =
        'BEGIN:VCARD\n' + // metadata of the contact card
        'VERSION:3.0\n' +
        'FN:' + conf.NOM_OWNER + '\n' + // full name
        'ORG:undefined;\n' + // the organization of the contact
        'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
        'END:VCARD';
    zk.sendMessage(dest, {
        contacts: {
            displayName: conf.NOM_OWNER,
            contacts: [{ vcard }],
        },
    },{quoted:ms});
  }
});

zokou({ nomCom: "dev", categorie: "Général", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
      { nom: "Djalega++", numero: "22559763447" },
      { nom: "᚛M๏𝓷keℽ D Lบffy᚜", numero: "22891733300" },
      // Ajoute d'autres développeurs ici avec leur nom et numéro
    ];

    let message = "👋 Bienvenue chez Zokou ! Voici les développeurs :\n\n";
    for (const dev of devs) {
      message += `----------------\n• ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }
  var lien = mybotpic()
    if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    repondre(lien)
    repondre("Le lien ne se termine ni par .mp4 ou .gif ni par .jpeg , jpg ou .png");
    
}
});

zokou({ nomCom: "support", categorie: "Général" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("Veillez voir la discussion privé pour le lien svp ")
  await zk.sendMessage(auteurMessage,{text : `https://chat.whatsapp.com/H6oeuhfSMtV1Orjmf2NVnl`},{quoted :ms})

});

zokou({ nomCom: "repo", categorie: "Général", reaction: "✨" }, async (dest, zk, commandeOptions) => {
    const { ms, auteurMessage } = commandeOptions;
    const repository = "https://github.com/djalega8000/Zokou-2.0";
    const repositoryEng = "https://github.com/Faouz995/Zokou_2.0-eng"
    const Session_ID = "https://replit.com/@zoukoumignon/ZokouQrCode?v=1"; 

    let message = `Salut! 👋 ${auteurMessage} Merci d'avoir choisi Zokou-Md.\n\n 🔵 *Repo_fr* : ${repository}\n\n 🔵 *Repo_eng* : ${repositoryEng}\n\n 🔵 *Lien du scan* : ${Session_ID}\n`;

    const lien = 'https://i.imgur.com/ZrFTgKU.jpg';

    if (lien) {
        try {
            await zk.sendMessage(dest, { image: { url: lien }, caption: message }, { quoted: ms });
        } catch (error) {
            console.error(error);
        }
    }
});



