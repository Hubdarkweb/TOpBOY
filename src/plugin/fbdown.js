import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import pkgg from 'nayan-media-downloader';
const { ndown } = pkgg;

const fbSearchResultsMap = new Map();
let fbSearchIndex = 1; 

const facebookCommand = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;

  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
    }
  }

  const selectedId = selectedListId || selectedButtonId;

  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['facebook', 'fb', 'fbdl'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply('*Please provide a Facebook video URL.*');
    }

    try {
      await m.React("🎁");

      const fbData = await ndown(text);
      if (!fbData.status) {
        await m.reply('No results found.');
        await m.React("❌");
        return;
      }

      fbSearchResultsMap.set(fbSearchIndex, fbData);

      const buttons = fbData.data.map((video, index) => ({
        "name": "quick_reply",
        "buttonParamsJson": JSON.stringify({
          display_text: `📥 Download ${video.resolution}`,
          id: `media_${index}_${fbSearchIndex}`
        })
      }));

      const sections = fbData.data.map((video) => ({
        title: 'Video Qualities',
        rows: [{
          title: `📥 Download ${video.resolution}`,
          description: `Resolution: ${video.resolution} | Size: ${(video.size / (1024 * 1024)).toFixed(2)} MB`,
          id: `media_${fbSearchIndex}_${video.resolution}`
        }]
      }));

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `*👨‍💻TOpBOY👨‍💻* \n*FACEBOOK POST DOWNLOADER*\n\n> *🔰TITLE*: ${fbData.title}\n> *🔰SIZE*: ${(fbData.size / (1024 * 1024)).toFixed(2)} MB`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "© 𝐂yberpunk🐼🥷🗽"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: `https://i.imgur.com/Gw7jtD0.jpeg` } }, { upload: Matrix.waUploadToServer })),
                title: "",
                gifPlayback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons
              }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      });
      await m.React("✅");

      fbSearchIndex += 1; 
    } catch (error) {
      console.error("Error processing your request:", error);
      await m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) { 
    if (selectedId.startsWith('media_')) {
      const parts = selectedId.split('_');
      const qualityIndex = parseInt(parts[1]);
      const key = parseInt(parts[2]);
      const selectedMedia = fbSearchResultsMap.get(key);

      if (selectedMedia) {
        try {
          const videoUrl = selectedMedia.data[qualityIndex].url;
          let finalMediaBuffer, mimeType, content;

          finalMediaBuffer = await getStreamBuffer(videoUrl);
          mimeType = 'video/mp4';

          const fileSizeInMB = finalMediaBuffer.length / (1024 * 1024);

          if (fileSizeInMB <= 300) {
            content = { 
              video: finalMediaBuffer, 
              mimetype: 'video/mp4', 
              caption: '> © 𝐂yberpunk🐼🥷🗽🌊',
            };
            await Matrix.sendMessage(m.from, content, { quoted: m });
          } else {
            await m.reply('The video file size exceeds 300MB.');
          }
        } catch (error) {
          console.error("Error processing your request:", error);
          await m.reply('Error processing your request.');
          await m.React("❌");
        }
      }
    }
  }
};

const getStreamBuffer = async (url) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
};

export default facebookCommand;
