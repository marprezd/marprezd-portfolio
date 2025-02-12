'use client'

import type { WakapiStats, WakapiSummaries } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import fetcher from '@/lib/fetcher'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWR from 'swr'

const BestDaysAverage: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('app')
  const { data: year, error: yearError } = useSWR<WakapiStats>('/api/wakapi/stats/last_12_months', fetcher)
  const { data: dailyAvg, error: dailyAvgError } = useSWR<WakapiStats>('/api/wakapi/stats/last_12_months', fetcher)
  const { data: yesterday, error: yesterdayError } = useSWR<WakapiSummaries>('/api/wakapi/summaries/yesterday', fetcher)
  const { data: today, error: todayError } = useSWR<WakapiSummaries>('/api/wakapi/summaries/today', fetcher)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return null

  if (yearError)
    return <div>Failed to load</div>
  if (dailyAvgError)
    return <div>Failed to load</div>
  if (yesterdayError)
    return <div>Failed to load</div>
  if (todayError)
    return <div>Failed to load</div>

  // Cumulative total
  const cumulativeTotal = year?.data.data.total_seconds
  const hours = Math.floor(cumulativeTotal! / 3600)
  const minutes = Math.floor((cumulativeTotal! - (hours * 3600)) / 60)

  // Average coding per day
  const dailyAverage = dailyAvg?.data.data.daily_average
  const dailyAverageRounded = Math.round(dailyAverage!)
  const dailyHours = Math.floor(dailyAverageRounded / 3600)
  const dailyMinutes = Math.floor((dailyAverage! - (dailyHours * 3600)) / 60)

  // Coding in the last 48 hours
  const totalSecondsYesterday = yesterday?.data.daily_average.seconds
  const totalSecondsToday = today?.data.daily_average.seconds
  const totalMins = Math.floor((totalSecondsToday! - totalSecondsYesterday!) / 60)
  const percentageDifference = 100 * Math.abs((totalSecondsToday! - totalSecondsYesterday!) / ((totalSecondsToday! + totalSecondsYesterday!) / 2))

  return (
    <div ref={ref}>
      {inView && (
        <div className="col-span-2 space-y-5 lg:col-span-1">
          <div className="grid grid-cols-1">
            <Card className="w-full p-0.5">
              <CardHeader>
                <CardTitle>{t('about-me.charts.best-days-avgs.cumulative-total.title')}</CardTitle>
                <CardDescription>
                  {t('about-me.charts.best-days-avgs.cumulative-total.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="font-mono">
                {`${hours} ${t('about-me.charts.global-code-average.hr')} ${minutes} ${t('about-me.charts.global-code-average.min')}`}
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card className="w-full p-0.5">
              <CardHeader>
                <CardTitle>{t('about-me.charts.best-days-avgs.difference-48hrs.title')}</CardTitle>
                <CardDescription>
                  {t('about-me.charts.best-days-avgs.difference-48hrs.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-x-2 font-mono">
                {totalMins.toFixed(0)}
                {' '}
                {t('about-me.charts.best-days-avgs.difference-48hrs.min')}
                {totalSecondsToday! < totalSecondsYesterday!
                  ? (
                      <span className="flex items-center gap-x-1 text-red-600 dark:text-red-400">
                        <svg className="inline-block size-4 self-center" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="inline-block text-sm">
                          {percentageDifference.toFixed(2)}
                          %
                        </span>
                      </span>
                    )
                  : (
                      <span className="flex items-center gap-x-1 text-green-600 dark:text-green-400">
                        <svg className="inline-block size-4 self-center" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="inline-block text-sm">
                          {percentageDifference.toFixed(2)}
                          %
                        </span>
                      </span>
                    )}
              </CardContent>
            </Card>
            <Card className="w-full p-0.5">
              <CardHeader>
                <CardTitle>{t('about-me.charts.best-days-avgs.daily-average.title')}</CardTitle>
                <CardDescription>
                  {t('about-me.charts.best-days-avgs.daily-average.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="font-mono">
                {`${dailyHours} ${t('about-me.charts.global-code-average.hr')} ${dailyMinutes} ${t('about-me.charts.global-code-average.min')}`}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default BestDaysAverage
