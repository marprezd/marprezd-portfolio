'use client'

import { Link } from '@nextui-org/link'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import NewsletterIlustrationSvg from './newsletter-ilustration-svg'

export default function NewsletterWrapper() {
  const t = useTranslations('site')
  const { ref, inView } = useInView({
    threshold: 0.3,
  })
  const patreonProfileUrl = 'https://patreon.com/marprezd?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink'

  return (
    <div className="grid grid-cols-9 gap-4">
      <div ref={ref} className="order-last col-span-full place-self-center text-center sm:text-left xl:order-first xl:col-span-5">
        <div className={inView ? 'animate-fade animate-delay-1000 animate-duration-1000 animate-once animate-ease-in' : 'opacity-0'}>
          <h2 className="text-3xl font-bold md:text-4xl">
            {t('newsletter.title')}
          </h2>
          <p className="my-3 text-lg font-medium text-gray-600 dark:text-gray-300 lg:mb-0">
            {t('newsletter.desc')}
          </p>
          <div className="mt-0 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 lg:mt-2.5">
            <div className="w-full">
              <Link
                isExternal
                href={patreonProfileUrl}
                className="inline-flex items-center gap-x-2 rounded-full border border-neutral-200 bg-white p-1 ps-3 text-sm text-neutral-800 transition hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
              >
                {t('newsletter.cta-btn')}
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
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div ref={ref} className="col-span-full xl:col-span-4">
        <div className={inView ? 'animate-fade animate-delay-1000 animate-duration-1000 animate-once animate-ease-in' : 'opacity-0'}>
          <NewsletterIlustrationSvg />
        </div>
      </div>
    </div>
  )
}
