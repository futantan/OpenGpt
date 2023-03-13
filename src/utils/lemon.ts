export async function activateLicenseKey(licenseKey: string) {
  // https://docs.lemonsqueezy.com/help/licensing/license-api
  console.log('========= is going to activate license key')
  const response = await fetch(
    `https://api.lemonsqueezy.com/v1/licenses/activate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LEMON_API_KEY ?? ''}`,
      },
      body: JSON.stringify({
        license_key: licenseKey,
        instance_name: 'open-gpt.app',
      }),
    }
  )
  const result = await response.json()
  return result.activated
}

export async function validateLicenseKey(licenseKey: string) {
  // https://docs.lemonsqueezy.com/help/licensing/license-api
  const response = await fetch(
    `https://api.lemonsqueezy.com/v1/licenses/validate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LEMON_API_KEY ?? ''}`,
      },
      body: JSON.stringify({
        license_key: licenseKey,
      }),
    }
  )
  const result = await response.json()

  if (!result.valid) {
    return {
      isValid: false,
    }
  }

  const total = result.license_key.activation_limit
  const used = result.license_key.activation_usage
  return {
    isValid: result.valid && used < total,
    total,
    used,
  }
}

export async function clientValidateLicenseKey(licenseKey: string) {
  return fetch(`/api/check-license-key?licenseKey=${licenseKey}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then((v) => v.json())
}
