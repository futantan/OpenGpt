export const saveLicenseKey = (key: string) => {
  localStorage.setItem('opengpt-licenseKey', key)
}

export const loadLicenseKey = () => {
  return localStorage.getItem('opengpt-licenseKey') || ''
}
