module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    '@antfu/eslint-config-ts',
  ],
  settings: {
    react: {
      version: '18.2',
    },
  },
  rules: {
    'no-console': 'off',
    'curly': ['error', 'all'],
    'jsx-quotes': [
      'error',
      'prefer-double',
    ],
    'react/react-in-jsx-scope': 'off',
  },
}
