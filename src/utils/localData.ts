export const saveOpenAIKey = (key: string) => {
  localStorage.setItem('openAIKey', key)
}

export const loadOpenAIKey = () => {
  return localStorage.getItem('openAIKey') || ''
}
