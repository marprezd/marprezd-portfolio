import { IconArrowNarrowRight, IconBrandGithub } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function Hero() {
  const t = useTranslations('app')
  const githubUrlHandle = () => {
    document.location.href = 'https://www.github.com/marprezd'
  }
  return (
    <div>
      <header className="flex justify-center">
        <Link
          href="/#quick-summary"
          className="inline-flex cursor-pointer items-center gap-x-2 rounded-full border border-gray-300 bg-white p-1 ps-3 text-xs text-gray-800 transition hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          {t('home-page.badge-title')}
          <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-gray-300 px-2.5 py-1.5 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
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
        </Link>
      </header>
      <div className="mx-auto mt-5 max-w-4xl space-y-4 text-center">
        {/* Title and description */}
        {t.rich('home-page.title', {
          h1: chunks => (
            <h1 className="block text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{chunks}</h1>
          ),
          span: chunks => (
            <span className="text-cyan-700 dark:text-cyan-300">{chunks}</span>
          ),
        })}
        <p className="text-gray-700 dark:text-gray-300">
          {t('home-page.description')}
        </p>
      </div>
      <footer className="mt-8 flex justify-center gap-3">
        {/* CTA Link: It all starts here! */}
        <Link href="/blog" passHref>
          <Button>
            {t('home-page.started')}
            <IconArrowNarrowRight size={20} />
          </Button>
        </Link>
        {/* Link to my Github profile */}
        <Button onClick={githubUrlHandle} variant="secondary">
          <IconBrandGithub size={20} />
          Github
        </Button>
      </footer>
    </div>
  )
}
