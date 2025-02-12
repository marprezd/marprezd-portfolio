'use client'

import type { WakapiSummaries } from '@/types'
import type { ApexOptions } from 'apexcharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import fetcher from '@/lib/fetcher'
import { useFormatter, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import useSWR from 'swr'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const BestDaysBarCharts: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })
  const format = useFormatter()
  const t = useTranslations('app')
  const { data, error } = useSWR<WakapiSummaries>('/api/wakapi/summaries/last_7_days', fetcher)
  const { resolvedTheme } = useTheme()

  const dseries: { x: string, y: number }[] = []

  // eslint-disable-next-line array-callback-return
  data?.data.data.map((obj) => {
    const dateTime = new Date(obj.range.start)

    dseries.push({
      x: `${format.dateTime(dateTime, { weekday: 'short' })}`,
      y: obj.grand_total.hours,
    })
  })

  if (error)
    return <div>Failed to load</div>

  const options: ApexOptions = {
    series: [
      {
        name: t('about-me.charts.best-days.label'),
        data: dseries,
      },
    ],
    chart: {
      id: 'best_days',
      type: 'bar',
      width: 'auto',
      height: '350',
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        borderRadiusApplication: 'end',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'numeric',
      decimalsInFloat: 0,
      stepSize: 1,
    },
    theme: {
      mode: resolvedTheme === 'light' ? 'light' : 'dark',
    },
    noData: {
      text: 'No data available',
      align: 'center',
      verticalAlign: 'middle',
    },
    legend: {
      show: false,
    },
    yaxis: {
      decimalsInFloat: 0,
      forceNiceScale: true,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `${val} ${t('about-me.charts.global-code-average.hr')}`
        },
      },
    },
  }

  return (
    <div ref={ref}>
      {inView && (
        <Card>
          <CardHeader>
            <CardTitle>
              {t('about-me.charts.best-days.title')}
            </CardTitle>
            <CardDescription>
              {t('about-me.charts.best-days.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApexChart
              height="350"
              options={options}
              series={options.series}
              type="bar"
              width="100%"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default BestDaysBarCharts
