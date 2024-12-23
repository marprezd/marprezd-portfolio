import { IconBriefcaseFilled, IconMicrophoneFilled } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import Experience from './experience'
import Podcast from './podcast'

function Timeline() {
  const t = useTranslations('site')

  return (
    <div className="container mx-auto max-w-6xl py-5 md:py-7 lg:py-8">
      <section className="flex flex-col divide-y-1 divide-dotted divide-default-400 rounded-3xl bg-gray-50 text-default-900 dark:bg-gray-900 lg:flex-row lg:divide-x-1 lg:divide-y-0">
        <div className="basis-full lg:basis-1/2">
          <div className="p-4">
            <div className="flex items-center gap-x-2">
              <div className="inline-flex items-center justify-center">
                <IconBriefcaseFilled className="size-7 shrink-0" />
              </div>
              <div className="shrink-0">
                <h2 className="text-3xl font-bold">
                  {t('about-me.experiences.title')}
                </h2>
              </div>
            </div>
            <p className="text-lg">
              {t('about-me.experiences.desc')}
            </p>
            <div className="mb-4">
              <span className="inline-block h-1 w-40 rounded-full bg-default-700" />
              <span className="ml-1 inline-block h-1 w-3 rounded-full bg-default-700" />
              <span className="ml-1 inline-block size-1 rounded-full bg-default-700" />
            </div>
            <Experience />
          </div>
        </div>
        <div className="basis-full lg:basis-1/2">
          <div className="p-4">
            <div className="flex items-center gap-x-2">
              <div className="inline-flex items-center justify-center">
                <IconMicrophoneFilled className="size-7 shrink-0" />
              </div>
              <div className="shrink-0">
                <h2 className="text-3xl font-bold xl:leading-tight">
                  {t('about-me.podcast.title')}
                </h2>
              </div>
            </div>
            <p className="text-lg">
              {t('about-me.podcast.desc')}
            </p>
            <div className="mb-4">
              <span className="inline-block h-1 w-40 rounded-full bg-default-700" />
              <span className="ml-1 inline-block h-1 w-3 rounded-full bg-default-700" />
              <span className="ml-1 inline-block size-1 rounded-full bg-default-700" />
            </div>
            <Podcast />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Timeline
