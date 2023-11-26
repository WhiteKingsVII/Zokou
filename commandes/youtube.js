const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const yt = require("../framework/dl/ytdl-core.js");
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");

zokou({
  nomCom: "song",
  categorie: "Recherche",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez entrer un terme de recherche s'il vous plaît.");
    return;
  }

  try {
    let topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;

      let infoMess = {
        image: { url: videos[0].thumbnail },
        caption: `\n*nom de l'audio :* _${videos[0].title}_

*Durée :* _${videos[0].timestamp}_

*Lien :* _${videos[0].url}_

_*En cours de téléchargement...*_\n\n`
      };

      zk.sendMessage(origineMessage, infoMess, { quoted: ms });

      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });
      const filename = 'audio.mp3';
      const fileStream = fs.createWriteStream(filename);

      audioStream.pipe(fileStream);

      fileStream.on('finish', async () => {
        repondre("entrez 1 pour avoir en audio ; entrez 2 pour l'avoir en fichier doc");

        let choix = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 30000 // 30 secondes
        });

        if (choix.message.conversation == 1 || choix.message.message.extendedTextMessage.text == 1) {
          zk.sendMessage(origineMessage, { audio: { url: "audio.mp3" }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
          console.log("Envoi du fichier audio terminé !");
        } else {
          let buttonMessage = {
            document: fs.readFileSync(`./audio.mp3`),
            mimetype: 'audio/mpeg',
            fileName: videos[0].title + ".mp3",
            headerType: 4,
            contextInfo: {
              externalAdReply: {
                title: videos[0].title,
                body: auteurMessage,
                renderLargerThumbnail: true,
                thumbnailUrl: videos[0].thumbnail,
                mediaUrl: videos[0].url,
                mediaType: 1,
              },
            },
          };
          zk.sendMessage(origineMessage, buttonMessage, { quoted: ms });
        }
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'écriture du fichier audio :', error);
        repondre('Une erreur est survenue lors de l\'écriture du fichier audio.');
      });
    } else {
      repondre('Aucune vidéo trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du téléchargement de la vidéo :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});

zokou({
  nomCom: "video",
  categorie: "Recherche",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Veillez entrer un terme de recherche s'il vous plaît");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `*nom de la vidéo :* _${Element.title}_
*Durée :* _${Element.timestamp}_
*Lien :* _${Element.url}_
_*En cours de téléchargement...*_\n\n`
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      const videoInfo = await ytdl.getInfo(Element.url);
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      const filename = 'video.mp4';
      const fileStream = fs.createWriteStream(filename);

      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        zk.sendMessage(origineMessage, { video: { url: "./video.mp4" }, caption: "*Zokou-Md", gifPlayback: false }, { quoted: ms });
      });

      fileStream.on('error', (error) => {
        console.error('Erreur lors de l\'écriture du fichier vidéo :', error);
        repondre('Une erreur est survenue lors de l\'écriture du fichier vidéo.');
      });
    } else {
      repondre('Aucune vidéo trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche ou du téléchargement de la vidéo :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de la vidéo.');
  }
});
