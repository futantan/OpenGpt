import { isDev } from './isDev'

export const HOST_URL = isDev
  ? 'http://localhost:3000'
  : `https://${process.env.VERCEL_URL}` // can only be used on the server
