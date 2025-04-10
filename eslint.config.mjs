import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
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
  extends: [
    'next/core-web-vitals',
  ],
  rules: {},
}))
