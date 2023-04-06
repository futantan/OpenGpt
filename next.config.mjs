// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'zh-Hant'],
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  }
}
export default config
