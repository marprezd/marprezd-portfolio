import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

export default antfu({
  formatters: true,
  react: true,
  stylistic: true,
}, {
  rules: {
    'ts/no-unused-expressions': ['error', { allowTernary: true }],
  },
}, ...compat.config({
  // https://github.com/francoismassart/eslint-plugin-tailwindcss
  extends: [
    'plugin:tailwindcss/recommended',
    'eslint:recommended',
    'next'
  ],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
}))
