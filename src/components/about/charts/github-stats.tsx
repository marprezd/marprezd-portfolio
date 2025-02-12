'use client'

import type { Stats } from '@/types'
import type { ApexOptions } from 'apexcharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import React from 'react'
import { useInView } from 'react-intersection-observer'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface GithubStatsProps {
  stats: Stats | null
  translateStars: string
  translateCommitments: string
  translateTotalRepos: string
  translateFollowers: string
  translateContributions: string
  translatePrs: string
  translateIssues: string
}

function GithubStats({
  stats,
  translateStars,
  translateCommitments,
  translateTotalRepos,
  translateFollowers,
  translateContributions,
  translatePrs,
  translateIssues,
}: GithubStatsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })
  const { resolvedTheme } = useTheme()
  const t = useTranslations('app')

  const earning_starts = stats?.stars
  const total_commits = stats?.totalCommits
  const total_repos = stats?.totalRepos
  const total_follower = stats?.followers
  const total_contributions = stats?.contributions
  const total_prs = stats?.prs
  const total_isssues = stats?.issues

  const data = [
    earning_starts,
    total_commits,
    total_repos,
    total_follower,
    total_contributions,
    total_prs,
    total_isssues,
  ]

  const series: ApexNonAxisChartSeries | number[] = []

  for (let i = 0; i < data.length; i++) {
    series.push(data[i] as number)
  }

  const options: ApexOptions = {
    chart: {
      id: 'githubstats-chart',
      type: 'donut',
      width: 'auto',
      height: 'auto',
      background: 'transparent',
    },
    labels: [
      translateStars,
      translateCommitments,
      translateTotalRepos,
      translateFollowers,
      translateContributions,
      translatePrs,
      translateIssues,
    ],
    legend: {
      show: true,
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${Math.round((val as number * 100) / 100)}%`
      },
      dropShadow: {
        enabled: false,
      },
    },
    fill: {
      // colors: ['#208b3a', '#be1e2d', '#4f3517', '#315c4f', '#5d0124', '#133a94', '#997B66'],
      opacity: 1,
      type: 'solid',
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    theme: {
      mode: resolvedTheme === 'light' ? 'light' : 'dark',
    },
    noData: {
      text: 'No data available',
      align: 'center',
      verticalAlign: 'middle',
    },
  }

  return (
    <div ref={ref}>
      {inView && (
        <Card>
          <CardHeader>
            <CardTitle>
              {t('about-me.charts.githubStats.title')}
            </CardTitle>
            <CardDescription>
              {t('about-me.charts.githubStats.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApexChart
              height="350"
              options={options}
              series={series}
              type="donut"
              width="100%"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default GithubStats
