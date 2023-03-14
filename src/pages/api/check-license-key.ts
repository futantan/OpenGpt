import { validateLicenseKey } from '@/utils/lemon'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  // Check for secret to confirm this is a valid request
  const licenseKey = req.query.licenseKey as string
  if (licenseKey) {
    return res.status(200).json(await validateLicenseKey(licenseKey))
  } else {
    return res.status(200).json({ isValid: false })
  }
}

export default handler
