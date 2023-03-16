export const randomChooseFromApiToken = (v: { isPaid: boolean }) => {
  const keys = v.isPaid
    ? process.env.PAID_OPENAI_API_KEY?.split(',')
    : process.env.OPENAI_API_KEY?.split(',')
  return sample(keys)
}

const sample = (arr: any[] = []) => {
  const len = arr === null ? 0 : arr.length
  return len ? arr[Math.floor(Math.random() * len)] : undefined
}
