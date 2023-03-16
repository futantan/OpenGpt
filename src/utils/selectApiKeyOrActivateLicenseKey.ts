import { validateLicenseKey } from '@/utils/lemon'
import { randomChooseFromApiToken } from './randomChooseFromApiToken'

// when request comes to this function, the rate limit is passed
export const selectApiKeyOrActivateLicenseKey = async (
  userInput: string | undefined
): Promise<{ isUsingLicense: boolean; key: string }> => {
  if (userInput) {
    console.log('💸 ========== will use license key')
    const { isValid } = await validateLicenseKey(userInput)
    if (!isValid) {
      console.log('💸 ========== license key invalid')
      throw new Error('license key 不合法或次数已耗尽!')
    }
    return { isUsingLicense: true, key: randomChooseFromApiToken(true) }
  }

  console.log('💸 ========== using system key')
  return { isUsingLicense: false, key: randomChooseFromApiToken(false) }
}
