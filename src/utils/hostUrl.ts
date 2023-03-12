import { isDev } from './isDev'

// can only be used on the server
export const HOST_URL = isDev
  ? 'http://localhost:3000'
  : `https://${process.env.VERCEL_URL}`
