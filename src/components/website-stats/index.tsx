'use client'

import type { Locale } from '@/i18n/routing'
import { posts } from '#site/content'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import TotalCourses from './total-courses'
import TotalPost from './total-posts'
import TotalProjects from './total-projects'

interface WebsiteStatsProps {
  params: {
    locale: Locale
  }
}

export default function Index({ params: { locale } }: WebsiteStatsProps) {
  const t = useTranslations('site')
  const allPost = posts.filter(post => post.language === locale && post.published)
  const totalPost = allPost.length

  const postLabel = t('website-stats.posts')
  const coursesLabel = t('website-stats.courses')
  const projectsLabel = t('website-stats.projects')

  const { ref, inView } = useInView({
    threshold: 0.3,
  })

  return (
    <div className="space-y-8">
      <div ref={ref}>
        <div className={inView ? 'animate-fade-up animate-delay-500 animate-duration-500 animate-once animate-ease-in' : 'opacity-0'}>
          <div className="flex items-center justify-center">
            <h2 className="text-center text-3xl font-bold leading-tight text-white">
              {t('website-stats.title')}
            </h2>
          </div>
          <div className="text-center">
            <span className="inline-block h-1 w-40 rounded-full bg-white" />
            <span className="ml-1 inline-block h-1 w-3 rounded-full bg-white" />
            <span className="ml-1 inline-block size-1 rounded-full bg-white" />
          </div>
        </div>
      </div>
      <div ref={ref}>
        <div className={`grid grid-cols-1 items-center gap-x-12 gap-y-20 sm:grid-cols-3 ${inView ? 'animate-fade animate-delay-1000 animate-duration-1000 animate-once animate-ease-in' : 'opacity-0'}`}>
          <div className="relative text-center before:absolute before:-top-full before:start-1/2 before:mt-3.5 before:h-20 before:w-px before:-translate-x-1/2 before:rotate-[60deg] before:bg-white first:before:hidden sm:before:-start-6 sm:before:top-1/2 sm:before:mt-0 sm:before:-translate-x-0 sm:before:-translate-y-1/2 sm:before:rotate-12">
            <TotalPost
              postLenght={totalPost}
              label={postLabel}
            />
          </div>
          <div className="relative text-center before:absolute before:-top-full before:start-1/2 before:mt-3.5 before:h-20 before:w-px before:-translate-x-1/2 before:rotate-[60deg] before:bg-white first:before:hidden sm:before:-start-6 sm:before:top-1/2 sm:before:mt-0 sm:before:-translate-x-0 sm:before:-translate-y-1/2 sm:before:rotate-12">
            <TotalCourses
              label={coursesLabel}
            />
          </div>
          <div className="relative text-center before:absolute before:-top-full before:start-1/2 before:mt-3.5 before:h-20 before:w-px before:-translate-x-1/2 before:rotate-[60deg] before:bg-white first:before:hidden sm:before:-start-6 sm:before:top-1/2 sm:before:mt-0 sm:before:-translate-x-0 sm:before:-translate-y-1/2 sm:before:rotate-12">
            <TotalProjects
              label={projectsLabel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
