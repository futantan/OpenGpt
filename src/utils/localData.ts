export const saveOpenAIKey = (key: string) => {
  localStorage.setItem('openAIKey', key)
}

export const loadOpenAIKey = () => {
  return localStorage.getItem('openAIKey') || ''
}

export const saveLicenseKey = (key: string) => {
  localStorage.setItem('opengpt-licenseKey', key)
}

export const loadLicenseKey = () => {
  return localStorage.getItem('opengpt-licenseKey') || ''
}
