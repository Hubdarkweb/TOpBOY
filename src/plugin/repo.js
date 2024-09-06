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
    if (['repo', 'sc'].includes(cmd)) {

  const uptimeMessage = `
_________________________________________
*🔰GitHub Profile - @Hubdarkweb*
*🔰Name:  𝐂yberpunk🌊🥷🗽🐼👨‍💻*
*🔰Username:* @TOpPLUG
*🔰Bio: Zooties☣️🪲🐼🗽🥷🌊🪰🏴‍☠️📱🪬🕷️🪳*
*𝐌𝐚𝐬𝐭𝐞𝐫_of_𝐋𝐢𝐟𝐞*
*@𝐂yberpunk🌊🥷🗽🐼*
*🔰IDID:* Hubdarkweb 
*🔰Node IDD:* U_kgDOB4KZjw
*🔰Profile URL:* https://avatars.githubusercontent.com/u/Hubdarkweb?v=4
*🔰GitHub URL:* https://github.com/Hubdarkweb
*🔰Adminin:* No
*🔰Companyy:* TOpPLUG GEEKS 🪬🥷🗽🐼🪲☣️🏴‍☠️
*🔰Blogg:* https://cyberpunk.vercel.app/index.html
*🔰Locationon:* Africa/Kenya 
*🔰Emailil:* N/A
*🔰Public Repositorieses:* 110
_________________________________________
`;

  const buttons = [
        {
          "name": "cta_url",
          "buttonParamsJson": JSON.stringify({
            display_text: "GITHUB",
            url: `https://github.com/Hubdarkweb/TOpBOY/fork`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "MENU",
            id: `.menu`
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
            text: "© 𝐂ʀᴇᴀᴛᴇᴅ 𝐁ʏ  𝐂yberpunk🌊🥷🗽🐼"
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
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "TOpBOY GITHUB",
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
