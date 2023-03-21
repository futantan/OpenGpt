const { i18n } = require('./next-i18next.config.js')

module.exports = {
  baseLocale: 'zh',
  locales: i18n.locales, // avoid duplicated
  localePath: 'public/locales',
  // openAIApiKey: process.env.OPENAI_API_KEY, // TODO: update key here
  // openAIApiUrl: process.env.OPENAI_API_URL,
}
