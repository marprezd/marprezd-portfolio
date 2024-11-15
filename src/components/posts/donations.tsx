/* eslint-disable node/prefer-global/process */
import { Avatar, AvatarGroup } from '@nextui-org/avatar'
import { useTranslations } from 'next-intl'
import React from 'react'
import SponsorLargeButton from '../sponsor/sponsor-large-button'

export default function Donations() {
  const t = useTranslations('site')
  const PATREON_CLIENT_ID: string = process.env.PATREON_CLIENT_ID || ''

  return (
    <div>
      <section className="mx-auto border-y border-gray-300 bg-default-50 dark:border-gray-700">
        <div className="relative py-10 md:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 m-auto grid h-max w-full grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="h-56 bg-gradient-to-br from-teal-500 to-purple-400 blur-[106px] dark:from-blue-700" />
            <div className="h-32 bg-gradient-to-r from-cyan-400 to-sky-300 blur-[106px] dark:to-indigo-600" />
          </div>
          <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-6">
            <div className="relative">
              <h2 className="mb-4 text-center text-xs font-medium uppercase tracking-wide text-primary-900">{t('posts.donations.label')}</h2>
              <div className="flex items-center justify-center">
                <AvatarGroup isBordered>
                  <Avatar src="https://randomuser.me/api/portraits/men/12.jpg" size="sm" />
                  <Avatar src="https://randomuser.me/api/portraits/women/12.jpg" size="md" />
                  <Avatar src="https://randomuser.me/api/portraits/men/21.jpg" size="lg" />
                  <Avatar src="https://randomuser.me/api/portraits/women/9.jpg" size="md" />
                  <Avatar src="https://randomuser.me/api/portraits/men/18.jpg" size="sm" />
                </AvatarGroup>
              </div>
              <div className="m-auto mt-6 space-y-6 md:w-8/12 lg:w-7/12">
                <h2 className="text-center text-4xl font-light text-gray-800 dark:text-white md:text-5xl">
                  {t('posts.donations.title')}
                </h2>
                <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300">
                  {t('posts.donations.desc')}
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <SponsorLargeButton
                    clientID={PATREON_CLIENT_ID}
                    redirectUri="https://marprezd.vercel.app/thank-for-donating"
                    pledgeAmount={5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
