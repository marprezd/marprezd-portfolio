'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import Copyright from './copyright'
import BottomWaveSvg from './waves/bottom-wave-svg'

function Loading() {
  return null
}

const AboutComponent = dynamic(
  () => import('./widgets/about-me/profile'),
  {
    loading: () => <Loading />,
  },
)

const LanguageComponent = dynamic(
  () => import('./widgets/settings/language-switcher'),
  {
    loading: () => <Loading />,
  },
)

const ThemeComponent = dynamic(
  () => import('./widgets/settings/theme-switcher'),
  {
    loading: () => <Loading />,
  },
)

const UsefulLinksComponent = dynamic(
  () => import('./widgets/useful-links/nav-items'),
  {
    loading: () => <Loading />,
  },
)

const ContactFormComponent = dynamic(
  () => import('./widgets/contact-me/contact-form'),
  {
    loading: () => <Loading />,
  },
)

export default function Footer() {
  const { ref, inView } = useInView()

  return (
    <footer className="relative bg-gradient-to-r from-cyan-50 via-cyan-100 to-cyan-50 dark:from-cyan-900 dark:via-cyan-950 dark:to-cyan-900">
      <BottomWaveSvg />
      <div ref={ref}>
        <div className={`${inView
          ? 'animate-fade animate-delay-500 animate-duration-1000 animate-once'
          : 'scale-0'}
        `}
        >
          <div className="mx-auto flex max-w-7xl flex-col space-y-4 px-4 pb-4 pt-16 sm:px-6 lg:px-8">
            <div className="flex w-full flex-col flex-wrap sm:flex-row">
              <div className="basis-full p-4 sm:basis-1/2 lg:basis-1/4">
                <AboutComponent />
              </div>
              <div className="basis-full space-y-5 p-4 sm:basis-1/2 lg:basis-1/4">
                <LanguageComponent />
                <ThemeComponent />
              </div>
              <div className="basis-full p-4 sm:basis-1/2 lg:basis-1/4">
                <UsefulLinksComponent />
              </div>
              <div className="basis-full p-4 sm:basis-1/2 lg:basis-1/4">
                <ContactFormComponent />
              </div>
            </div>
            <div className="grow border-t-1 border-primary px-4">
              <div className="mt-4 text-center text-xs text-primary-900 sm:text-left">
                <Copyright />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
