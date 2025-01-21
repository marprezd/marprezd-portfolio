import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

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
  ],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
}))
