import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  formatters: true,
  typescript: true,
  vue: true,
  stylistic: true,
}, {
  // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
  files: ['**/*.vue'],
  rules: {},
}, ...compat.config({
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
}))
