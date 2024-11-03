'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import NewsletterIlustrationSvg from './newsletter-ilustration-svg'
import SubscribeForm from './subscribe-form'

export default function NewsletterWrapper() {
  const t = useTranslations()
  const { ref, inView } = useInView({
    threshold: 0.3,
  })

  return (
    <div className="grid grid-cols-8 gap-4">
      <div ref={ref} className="order-last col-span-full place-self-center text-center sm:text-left xl:order-first xl:col-span-4">
        <div className={inView ? 'animate-fade animate-delay-1000 animate-duration-1000 animate-once animate-ease-in' : 'opacity-0'}>
          <h2 className="block text-2xl font-bold md:text-3xl">
            {t('site.newsletter.title')}
          </h2>
          <p className="my-3 lg:mb-0">
            {t('site.newsletter.desc')}
          </p>
          <div className="mt-0 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 lg:mt-2.5">
            <div className="w-full">
              <SubscribeForm />
              <div className="mt-4">
                <div className="text-xs">
                  By subscribing you agree to
                  {' '}
                  <Link
                    className="text-primary underline decoration-primary decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid"
                    href="https://marprezd.substack.com/tos?utm_source=embed_publication"
                    target="_blank"
                  >
                    Substack&apos;s Terms of Use
                  </Link>
                  ,
                  {' '}
                  <Link
                    className="text-primary underline decoration-primary decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid"
                    href="https://marprezd.substack.com/privacy?utm_source=embed_publication"
                    target="_blank"
                  >
                    our Privacy Policy
                  </Link>
                  {' '}
                  and
                  {' '}
                  <Link
                    className="text-primary underline decoration-primary decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid"
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
