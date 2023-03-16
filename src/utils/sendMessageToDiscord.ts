import { fetchPost } from '@/utils/fetchPost'
import { isDev } from '@/utils/isDev'

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
const DISCORD_ALERT_URL = process.env.DISCORD_ALERT_URL

function noop() {}
export function sendMessageToDiscord(v: {
  id: string
  name: string
  description: string
}) {
  if (isDev) {
    return
  }
  if (DISCORD_WEBHOOK_URL) {
    return fetchPost(DISCORD_WEBHOOK_URL, {
      username: 'OpenGpt 机器人',
      embeds: [
        {
          author: {
            name: 'OpenGpt',
            url: 'https://open-gpt-app.vercel.app/',
            icon_url: 'https://avatars.githubusercontent.com/u/6268441?v=4',
          },
          title: '有新的 App 被创建啦！🎉',
          url: `https://open-gpt-app.vercel.app/app/${v.id}`,
          description: `[点我直达](https://open-gpt-app.vercel.app/app/${v.id})`,
          color: 15258703,
          fields: [
            { name: '应用名称', value: v.name, inline: false },
            { name: '描述', value: v.description, inline: false },
          ],
        },
      ],
    }).catch(noop)
  }
}

export function sendAlertToDiscord(message: string) {
  if (isDev) {
    return
  }
  if (DISCORD_ALERT_URL) {
    return fetchPost(DISCORD_ALERT_URL, { content: message }).catch(noop)
  }
}
