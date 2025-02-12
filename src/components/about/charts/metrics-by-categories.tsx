'use client'

import type { WakapiStats } from '@/types'
import type { ApexOptions } from 'apexcharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import fetcher from '@/lib/fetcher'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import useSWR from 'swr'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const MetricsByCategories: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })
  const t = useTranslations('app')
  const { data, error } = useSWR<WakapiStats>('/api/wakapi/stats/last_12_months', fetcher)
  const { resolvedTheme } = useTheme()

  const series: ApexAxisChartSeries | { data: { x: string, y: number }[] }[]
    = []

  // eslint-disable-next-line array-callback-return
  data?.data.data.categories.map((obj) => {
    series.push({
      data: [
        {
          x: obj.name,
          y: obj.total_seconds,
        },
      ],
    })
  })

  if (error)
    return <div>Failed to load</div>

  const options: ApexOptions = {
    chart: {
      id: 'categories-chart',
      type: 'treemap',
      width: 'auto',
      height: 'auto',
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      treemap: {
        shadeIntensity: 0,
        enableShades: true,
      },
    },
    tooltip: {
      theme: resolvedTheme === 'light' ? 'light' : 'dark',
      y: {
        formatter(val) {
          const hours = Math.floor(val / 3600)
          const minutes = Math.floor((val - (hours * 3600)) / 60)

          return `${hours} ${t('about-me.charts.categories-tracking.hr')} ${minutes} ${t('about-me.charts.categories-tracking.min')}`
        },
      },
    },
    noData: {
      text: 'No data available',
      align: 'center',
      verticalAlign: 'middle',
    },
    legend: {
      show: false,
    },
  }

  return (
    <div ref={ref}>
      {inView && (
        <Card>
          <CardHeader>
            <CardTitle>
              {t('about-me.charts.categories-tracking.title')}
            </CardTitle>
            <CardDescription>
              {t('about-me.charts.categories-tracking.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApexChart
              height="350"
              options={options}
              series={series}
              type="treemap"
              width="100%"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default MetricsByCategories
