'use client'

import { Link } from '@nextui-org/link'
import { button as buttonStyles } from '@nextui-org/theme'
import { IconArrowNarrowRight, IconBrandGithub } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { animateScroll as scroll, Link as ScrollLink } from 'react-scroll'

export default function Hero() {
  const t = useTranslations('site')
  const githubUrl = 'https://www.github.com/marprezd'

  return (
    <div>
      <header className="flex justify-center">
        {/* Link to my featured books section */}
        <ScrollLink
          to="featured-books"
          smooth
          duration={500}
          className="inline-flex cursor-pointer items-center gap-x-2 rounded-full border border-neutral-200 bg-white p-1 ps-3 text-sm text-neutral-800 transition hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
        >
          {t('hero.featured-books-badge')}
          <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-neutral-200 px-2.5 py-1.5 text-sm font-semibold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
            <svg
              className="size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </ScrollLink>
      </header>
      <div className="mx-auto mt-5 max-w-4xl space-y-4 text-center">
        {/* Title and description */}
        {t.rich('hero.title', {
          h1: chunks => (
            <h1 className="block text-4xl font-bold tracking-tight text-default-800 md:text-5xl lg:text-6xl">{chunks}</h1>
          ),
          span: chunks => (
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-600 bg-clip-text text-transparent">{chunks}</span>
          ),
        })}
        <p className="text-lg text-default-700 md:text-xl">
          {t('hero.description')}
        </p>
      </div>
      <footer className="mt-8 flex justify-center gap-3">
        {/* CTA Link: It all starts here! */}
        <Link
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
          href="/blog"
        >
          {t('hero.started')}
          <IconArrowNarrowRight size={20} />
        </Link>
        {/* Link to my Github profile */}
        <Link
          isExternal
          className={buttonStyles({
            color: 'secondary',
            variant: 'bordered',
            radius: 'full',
          })}
          href={githubUrl}
        >
          <IconBrandGithub size={20} />
          GitHub
        </Link>
      </footer>
    </div>
  )
}
