'use client'

import { Link } from '@nextui-org/link'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function NavItems() {
  const t = useTranslations('site')

  const navItems = [
    { href: 'https://marprezd.substack.com/?r=3lz4aj&utm_campaign=pub-share-checklist', label: 'Substack', external: true, target: '_blank' },
    { href: '/courses', label: t('footer.useful-links.links.courses'), external: false, target: '_self' },
    { href: '/guest-book', label: t('footer.useful-links.links.guest-book'), external: false, target: '_self' },
    { href: 'https://open.spotify.com/playlist/2jNvQQ6HlMeqdkngWiRlpW?si=f02e365e7b6b4384', label: 'Spotify', external: true, target: '_blank' },
  ]

  return (
    <div>
      <p className="font-medium text-cyan-950 dark:text-cyan-50">{t('footer.useful-links.label')}</p>
      <nav className="mt-4 flex flex-col space-y-2 text-sm">
        {navItems.map(link => (
          <Link showAnchorIcon={link.external === true} isBlock key={link.label} className="text-sm text-primary transition-colors duration-300 hover:opacity-75" href={link.href} target={link.target}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
