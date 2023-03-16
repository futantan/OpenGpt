import { checkOpenApiKeyFormat } from '@/utils/checkOpenApiKeyFormat'
import { validateLicenseKey } from '@/utils/lemon'
import { randomChooseFromApiToken } from './randomChooseFromApiToken'

// when request comes to this function, the rate limit is passed
export const selectApiKeyOrActivateLicenseKey = async (
  userInput: string | undefined
): Promise<{ isUsingLicense: boolean; key: string }> => {
  const systemKey = randomChooseFromApiToken()

  if (userInput) {
    if (checkOpenApiKeyFormat(userInput)) {
      // openAI key
      console.log('💸 ========== will use openAI key')
      return { isUsingLicense: false, key: userInput }
    } else {
      // license key
      console.log('💸 ========== will use license key')
      const { isValid } = await validateLicenseKey(userInput)
      if (!isValid) {
        console.log('💸 ========== license key invalid')
        throw new Error('license key 不合法或次数已耗尽!')
      }
      return { isUsingLicense: true, key: systemKey }
    }
  }

  console.log('💸 ========== using system key')
  return { isUsingLicense: false, key: systemKey }
}
