import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es', 'tr'],

  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/blog': {
      en: '/blog',
      es: '/blog',
      tr: '/blog',
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
      es: '/blog/[slug]',
      tr: '/blog/[slug]',
    },
    '/projects': {
      en: '/projects',
      es: '/proyectos',
      tr: '/projeler',
    },
    '/courses': {
      en: '/courses',
      es: '/cursos',
      tr: '/dersler',
    },
    '/hire-me': {
      en: '/hire-me',
      es: '/contratame',
      tr: '/beni-ise-al',
    },
    '/about-me': {
      en: '/about-me',
      es: '/acerca-de-mi',
      tr: '/benim-hakkimda',
    },
    '/guest-book': {
      en: '/guest-book',
      es: '/libro-de-visita',
      tr: '/ziyaretci-defteri',
    },
    '/resources': {
      en: '/resources',
      es: '/recursos',
      tr: '/kaynaklar',
    },
    '[...rest]': '[...rest]',
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, getPathname, redirect, usePathname, useRouter }
  = createNavigation(routing)
