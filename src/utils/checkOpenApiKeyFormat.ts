export function checkOpenApiKeyFormat(str: string) {
  const pattern = /^sk-[A-Za-z0-9]{48}$/
  return pattern.test(str)
}
