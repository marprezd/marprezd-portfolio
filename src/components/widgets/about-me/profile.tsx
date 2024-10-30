'use client'

import { IconBrandsKaggle } from '@/components/icon-brands-kaggle'
import { IconWrapper } from '@/components/icon-wrapper'
import { Avatar } from '@nextui-org/avatar'
import { IconBrandGithub, IconBrandLinkedin, IconBrandStackoverflow, IconBrandX } from '@tabler/icons-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'

const socialNavItems = [
  { label: 'Twitter', href: 'https://twitter.com/marprezd', icon: <IconBrandX size={18} /> },
  { label: 'Kaggle', href: 'https://www.kaggle.com/maprezd', icon: <IconBrandsKaggle /> },
  { label: 'Stackoverflow', href: 'https://stackoverflow.com.users/11650008/marprezd', icon: <IconBrandStackoverflow size={18} /> },
  { label: 'Github', href: 'https://www.github.com/marprezd', icon: <IconBrandGithub size={18} /> },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/maprezd', icon: <IconBrandLinkedin size={18} /> },
]

export default function Profile() {
  const t = useTranslations('site')

  return (
    <div>
      <Link className="mr-5 inline-flex items-center gap-x-2 text-xl font-semibold" href="/">
        <Avatar
          isBordered
          showFallback
          color="primary"
          name="MP"
          size="sm"
          src="https://res.cloudinary.com/dieoeaoiy/image/upload/bo_0px_solid_rgb:ffffff,c_fill,f_auto,g_face:auto,h_50,o_100,q_auto:best,r_0,w_50/v1662047991/profile_uezzbj.jpg"
        />
        <p className="mx-1 flex text-sm font-semibold text-primary">
          MARPREZD
        </p>
      </Link>
      <p className="mt-4 text-sm text-primary-900">
        {t('footer.about-me.summary')}
      </p>
      <div className="mt-8 flex space-x-2">
        {socialNavItems.map(link => (
          <Link key={link.label} aria-label={link.label} className="mx-1" href={link.href} target="_blank">
            <IconWrapper className="size-8 rounded-xl bg-secondary-700 p-2 text-white transition-colors duration-300 hover:opacity-70 dark:text-red-950">
              {link.icon}
            </IconWrapper>
          </Link>
        ))}
      </div>
    </div>
  )
}
