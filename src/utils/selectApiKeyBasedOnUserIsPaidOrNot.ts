import { validateLicenseKey } from '@/utils/lemon'
import { randomChooseFromApiToken } from './randomChooseFromApiToken'

export const selectAPaidKey = async (userInput: string): Promise<string> => {
  console.log('💸 ========== will use license key')
  const { isValid } = await validateLicenseKey(userInput)
  if (!isValid) {
    console.log('💸 ========== license key invalid')
    throw new Error('license key 不合法或次数已耗尽!')
  }
  return randomChooseFromApiToken({ isPaid: true })
}
