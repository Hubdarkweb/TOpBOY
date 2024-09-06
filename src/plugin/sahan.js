import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const alive = async (m, Matrix) => {
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
    if (['sahan', 'master'].includes(cmd)) {

  const uptimeMessage = `
_______________
𝗠ʏ 𝙸ɴꜰᴏʀᴍᴀᴛɪᴏɴ___😚💐
_________
60% ▰▰▰▰▰▰▱▱▱▱ 100% 𝐂ᴏᴍᴘʟᴇᴛᴇᴅ ✅
┏━━━━━━━━━━━━━━━━━
┃〲Nᴀᴍᴇ ❝ 🗽🥷🐼TOpPLUG🗽🥷🐼☣️🪲 ❞ 🐣
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┃ 〲Fʀᴏᴍ ❝ Africa 🏴‍☠️🥷❞ ☘️💐
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┃ 〲𝚁ᴇʟᴀᴛɪᴏɴꜱʜɪᴘ ❝ 𝙿irates🥷🏴‍☠️☣️🛒🛍️📱❞ 💍👸🏼
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┃ 〲Aɢᴇ ❝ 25 ᴏʟᴅ ❞ 🌝✨
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┃ 〲Sᴇx ❝ 𝙼ᴀʟᴇ ❞ 🍼🧩
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┃ 〲Eᴅᴜ ❝ Dropout❞ 💰💳🧑‍💻
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┃ 〲Jᴏʙ ❝ 🧑‍💻ᴘʀᴏɢʀᴀᴍᴍᴇʀ/🧑‍💻 ❞ 📡💡🧑‍💻
┗━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━
┃〲Cᴏᴜɴᴛʀʏ ❝ KENYA 🇰🇰🇪❞ 🏴‍☠️🧑‍💻
┗━━━━━━━━━━━━━━━━━
`;

  const buttons = [
        {
          "name": "cta_url",
          "buttonParamsJson": JSON.stringify({
            display_text: "OWNER",
            url: `https://wa.me/+254112767921`
          })
        },
     {
          "name": "cta_url",
          "buttonParamsJson": JSON.stringify({
            display_text: "SITE",
            url: `https://t.me/Hub7s`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "MENU",
            id: `.menu`
          })
        },
     {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "PING",
            id: `.ping`
          })
        }
        ];

  const msg = generateWAMessageFromContent(m.from, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: uptimeMessage
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "•ᴅᴀʀᴋ ꜱʜᴜᴛᴇʀ-ᴍᴅ•"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
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
                  forwardingScore: 999,
                  isForwarded: false,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '',
                  newsletterName: " ",
                  serverMessageId: 143
                }
              }
        }),
      },
    },
  }, {});

  await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
    }
};

export default alive;
