'use client'

import { Link } from '@nextui-org/link'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import NewsletterIlustrationSvg from './newsletter-ilustration-svg'
import SubscribeForm from './subscribe-form'

export default function NewsletterWrapper() {
  const t = useTranslations('site')
  const { ref, inView } = useInView({
    threshold: 0.3,
  })
  // const patreonProfileUrl = 'https://patreon.com/marprezd?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink'

  return (
    <div className="grid grid-cols-9 gap-4">
      <div ref={ref} className="order-last col-span-full place-self-center text-center sm:text-left xl:order-first xl:col-span-5">
        <div className={inView ? 'animate-fade animate-delay-1000 animate-duration-1000 animate-once animate-ease-in' : 'opacity-0'}>
          <h2 className="text-3xl font-bold md:text-4xl">
            {t('newsletter.title')}
          </h2>
          <p className="my-3 text-gray-600 dark:text-gray-300 lg:mb-0">
            {t('newsletter.desc')}
          </p>
          <div className="mt-0 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 lg:mt-2.5">
            <div className="w-full">
              <SubscribeForm />
              <div className="mt-4">
                <div className="text-xs">
                  By subscribing you agree to
                  {' '}
                  <Link
                    className="text-xs text-primary underline decoration-primary decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid"
                    href="https://marprezd.substack.com/tos?utm_source=embed_publication"
                    target="_blank"
                  >
                    Substack&apos;s Terms of Use
                  </Link>
                  ,
                  {' '}
                  <Link
                    className="text-xs text-primary underline decoration-primary decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid"
                    href="https://marprezd.substack.com/privacy?utm_source=embed_publication"
                    target="_blank"
                  >
                    our Privacy Policy
                  </Link>
                  {' '}
                  and
                  {' '}
                  <Link
                    className="text-xs text-primary underline decoration-primary decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid"
                    href="https://substack.com/ccpa?utm_source=embed_publication#personal-data-collected"
                    target="_blank"
                  >
                    our Information collection notice
                  </Link>
                </div>
              </div>
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
