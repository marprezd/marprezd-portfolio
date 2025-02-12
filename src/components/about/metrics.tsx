'use client'

import type { Stats } from '@/types'
import { useTranslations } from 'next-intl'
// import dynamic from 'next/dynamic'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import BestDaysAverage from './charts/best-days-average'
import BestDaysBarCharts from './charts/best-days-bar-charts'
import GithubContributions from './charts/github-contributions'
import GithubStats from './charts/github-stats'
import MetricsByCategories from './charts/metrics-by-categories'
import ProgrammingLanguages from './charts/programming-languages'

function Metrics({ stats }: { stats: Stats | null }) {
  const t = useTranslations('app')
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })
  return (
    <div className="col-span-full">
      <div ref={ref}>
        {inView && (
          <div className="text-center">
            <h2 className="text-default-950 text-3xl font-bold md:text-5xl">
              {t('about-me.metrics.title')}
            </h2>
            <p className="text-default-800 text-lg">
              {t('about-me.metrics.description')}
            </p>
            <div>
              <span className="bg-default-500 inline-block h-1 w-40 rounded-full" />
              <span className="bg-default-500 ml-1 inline-block h-1 w-3 rounded-full" />
              <span className="bg-default-500 ml-1 inline-block size-1 rounded-full" />
            </div>
          </div>
        )}
      </div>
      <div className="col-span-full space-y-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ProgrammingLanguages />
          <GithubStats
            stats={stats}
            translateCommitments={t('about-me.charts.githubStats.commitments')}
            translateContributions={t('about-me.charts.githubStats.contributions')}
            translateFollowers={t('about-me.charts.githubStats.total-followers')}
            translateIssues={t('about-me.charts.githubStats.issues')}
            translatePrs={t('about-me.charts.githubStats.prs')}
            translateStars={t('about-me.charts.githubStats.stars')}
            translateTotalRepos={t('about-me.charts.githubStats.total-repos')}
          />
          <BestDaysBarCharts />
          <MetricsByCategories />
          <GithubContributions stats={stats} />
          <BestDaysAverage />
        </div>
      </div>
    </div>
  )
}

export default Metrics
