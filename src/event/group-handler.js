import moment from 'moment-timezone';
import config from '../../config.cjs';
export default async function GroupParticipants(sock, { id, participants, action }) {
   try {
      const metadata = await sock.groupMetadata(id)

      // participants
      for (const jid of participants) {
         // get profile picture user
         let profile
         try {
            profile = await sock.profilePictureUrl(jid, "image")
         } catch {
            profile = "https://t.me/Hub7s"
         }

         // action
         if (action == "add" && config.WELCOME ) {
           const userName = jid.split("@")[0];
                    const joinTime = moment.tz('Africa/Kenya').format('HH:mm:ss');
                    const joinDate = moment.tz('Africs/Kenya').format('DD/MM/YYYY');
                    const membersCount = metadata.participants.length;
            sock.sendMessage(id, {
               text: `> Hello @${userName}! Welcome to *${metadata.subject}*.\n> You are the ${membersCount}th member.\n> Joined at: ${joinTime} on ${joinDate}
"`, contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Welcome`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: metadata.subject,
                     sourceUrl: 'https://t.me/Hub7s'
                  }
               }
            })
         } else if (action == "remove" && config.WELCOME ) {
           const userName = jid.split('@')[0];
                    const leaveTime = moment.tz('Africa/Kenya').format('HH:mm:ss');
                    const leaveDate = moment.tz('Africa/Kenya').format('DD/MM/YYYY');
                    const membersCount = metadata.participants.length;
            sock.sendMessage(id, {
               text: `> Goodbye @${userName} from ${metadata.subject}.\n> We are now ${membersCount} in the group.\n> Left at: ${leaveTime} on ${leaveDate}"`, contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Leave`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: 'https://sid-bhai.vercel.app'
                  }
               }
            })
         }
      }
   } catch (e) {
      throw e
   }
}