import type { LocalePrefix, Pathnames } from 'next-intl/routing'

// Locales
export const defaultLocale = 'en'
export const locales = ['en', 'es', 'tr'] as const
export type LocaleTypes = (typeof locales)[number]

export const pathnames = {
  '/': '/',
  '[...rest]': '[...rest]',
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix: LocalePrefix<typeof locales> = 'as-needed'

export type AppPathnames = keyof typeof pathnames
