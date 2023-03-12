import { HOST_URL } from '@/utils/constants'

export function revalidateHome() {
  return fetch(`${HOST_URL}/api/revalidate?secret=` + process.env.SERVER_SECRET)
}
