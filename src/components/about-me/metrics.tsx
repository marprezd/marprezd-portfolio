import type { Stats } from '@/types'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { useTranslations } from 'next-intl'
import React from 'react'
import BestDaysAverage from './charts/best-days-average'
import BestDaysBarCharts from './charts/best-days-bar-charts'
import CategoriesTreemapCharts from './charts/categories-treemap-charts'
import GithubContributions from './charts/github-contributions'
import GithubStats from './charts/github-stats'
import LanguagesTreemapCharts from './charts/languages-treemap-charts'

export default function Metrics({ stats }: { stats: Stats | null }) {
  const t = useTranslations('site')

  return (
    <div>
      <div className="mx-auto max-w-[60rem] px-4 lg:px-0">
        <div className="grid grid-cols-12 space-y-10">
          <div className="col-span-full">
            <div className="text-center">
              <h2 className="text-default-950 text-3xl font-bold md:text-5xl">
                {t('about-me.metrics.title')}
              </h2>
              <p className="text-lg text-default-800">
                {t('about-me.metrics.description')}
              </p>
              <div>
                <span className="inline-block h-1 w-40 rounded-full bg-default-500" />
                <span className="ml-1 inline-block h-1 w-3 rounded-full bg-default-500" />
                <span className="ml-1 inline-block size-1 rounded-full bg-default-500" />
              </div>
            </div>
          </div>
          <div className="col-span-full space-y-10">
            <Card className="border-1 border-default-300 dark:bg-gray-950">
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-md">{t('about-me.charts.githubContributions.title')}</p>
                  <p className="text-small text-default-500">{t('about-me.charts.githubContributions.subtitle')}</p>
                </div>
              </CardHeader>
              <CardBody>
                <GithubContributions stats={stats} />
              </CardBody>
            </Card>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="border-1 border-default-300 dark:bg-gray-950">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">{t('about-me.charts.programming-languages.title')}</p>
                    <p className="text-small text-default-500">{t('about-me.charts.programming-languages.subtitle')}</p>
                  </div>
                </CardHeader>
                <CardBody className="grid overflow-hidden">
                  <LanguagesTreemapCharts />
                </CardBody>
              </Card>
              <Card className="border-1 border-default-300 dark:bg-gray-950">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">{t('about-me.charts.githubStats.title')}</p>
                    <p className="text-small text-default-500">{t('about-me.charts.githubStats.subtitle')}</p>
                  </div>
                </CardHeader>
                <CardBody className="grid overflow-hidden">
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
                </CardBody>
              </Card>
              <Card className="border-1 border-default-300 dark:bg-gray-950">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">{t('about-me.charts.best-days.title')}</p>
                    <p className="text-small text-default-500">{t('about-me.charts.best-days.subtitle')}</p>
                  </div>
                </CardHeader>
                <CardBody className="grid overflow-hidden">
                  <BestDaysBarCharts />
                </CardBody>
              </Card>
              <Card className="border-1 border-default-300 dark:bg-gray-950">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">{t('about-me.charts.categories-tracking.title')}</p>
                    <p className="text-small text-default-500">{t('about-me.charts.categories-tracking.subtitle')}</p>
                  </div>
                </CardHeader>
                <CardBody className="grid overflow-hidden">
                  <CategoriesTreemapCharts />
                </CardBody>
              </Card>
            </div>
            <BestDaysAverage />
          </div>
        </div>
      </div>
    </div>
  )
}
