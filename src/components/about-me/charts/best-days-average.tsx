'use client'

import type { WakapiStats, WakapiSummaries } from '@/types'
import fetcher from '@/lib/fetcher'
import { Card, CardBody } from '@nextui-org/card'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { IconInfoSquareRounded } from '@tabler/icons-react'
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
  const t = useTranslations('site')
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
        <div className="grid grid-cols-9 gap-3">
          <Card className="col-span-full border-1 border-default-300 bg-white dark:bg-gray-950 xl:col-span-3">
            <CardBody>
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                  {t('about-me.charts.best-days-avgs.cumulative-total.title')}
                </p>
                <Popover backdrop="blur" showArrow>
                  <PopoverTrigger>
                    <IconInfoSquareRounded className="text-blue-600 dark:text-blue-400" size={20} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">{t('about-me.charts.best-days-avgs.cumulative-total.title')}</div>
                      <div className="text-tiny">{t('about-me.charts.best-days-avgs.cumulative-total.desc')}</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-lg font-medium">
                  {`${hours} ${t('about-me.charts.global-code-average.hr')} ${minutes} ${t('about-me.charts.global-code-average.min')}`}
                </h3>
              </div>
            </CardBody>
          </Card>
          <Card className="col-span-full border-1 border-default-300 bg-white dark:bg-gray-950 xl:col-span-3" shadow="sm">
            <CardBody>
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                  {t('about-me.charts.best-days-avgs.difference-48hrs.title')}
                </p>
                <Popover backdrop="blur" showArrow>
                  <PopoverTrigger>
                    <IconInfoSquareRounded className="text-blue-600 dark:text-blue-400" size={20} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">{t('about-me.charts.best-days-avgs.difference-48hrs.title')}</div>
                      <div className="text-tiny">{t('about-me.charts.best-days-avgs.difference-48hrs.desc')}</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-lg font-medium">
                  {totalMins.toFixed(0)}
                  {' '}
                  {t('about-me.charts.best-days-avgs.difference-48hrs.min')}
                </h3>
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
              </div>
            </CardBody>
          </Card>
          <Card className="col-span-full border-1 border-default-300 bg-white dark:bg-gray-950 xl:col-span-3" shadow="sm">
            <CardBody>
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                  {t('about-me.charts.best-days-avgs.daily-average.title')}
                </p>
                <Popover backdrop="blur" showArrow>
                  <PopoverTrigger>
                    <IconInfoSquareRounded className="text-blue-600 dark:text-blue-400" size={20} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">{t('about-me.charts.best-days-avgs.daily-average.title')}</div>
                      <div className="text-tiny">{t('about-me.charts.best-days-avgs.daily-average.desc')}</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-lg font-medium">
                  {`${dailyHours} ${t('about-me.charts.global-code-average.hr')} ${dailyMinutes} ${t('about-me.charts.global-code-average.min')}`}
                </h3>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  )
}

export default BestDaysAverage
