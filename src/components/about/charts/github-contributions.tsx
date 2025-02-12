/* eslint-disable style/multiline-ternary */
'use client'

import type { Stats } from '@/types'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import React from 'react'
import { ActivityCalendar } from 'react-activity-calendar'
import { useInView } from 'react-intersection-observer'
import {
  Tooltip as ReactTooltip,
} from 'react-tooltip'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'

interface GithubContributionProps {
  stats: Stats | null
}

function formatDate(date: string | number | Date) {
  const d = new Date(date)
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2)
    month = `0${month}`
  if (day.length < 2)
    day = `0${day}`

  return [year, month, day].join('-')
}

function GithubContributions({ stats }: GithubContributionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })
  const { resolvedTheme } = useTheme()
  const locales = useLocale()
  const t = useTranslations('app')
  const format = useFormatter()
  const contributions = stats?.contributionCalendar.weeks
  const series: { date: string, count: number, level: number }[] = []

  // eslint-disable-next-line array-callback-return
  contributions?.map((obj) => {
    // eslint-disable-next-line array-callback-return
    obj.contributionDays.map((obj) => {
      series.push({
        date: formatDate(obj.date),
        count: obj.contributionCount,
        level: obj.contributionCount === 0
          ? 0
          : obj.contributionCount < 3
            ? 1
            : obj.contributionCount < 5
              ? 2
              : obj.contributionCount < 8
                ? 3
                : 4,
      })
    })
  })

  return (
    <div ref={ref}>
      {inView && (
        <Card className="col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>
              {t('about-me.charts.githubContributions.title')}
            </CardTitle>
            <CardDescription>
              {t('about-me.charts.githubContributions.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityCalendar
              data={series}
              fontSize={13}
              maxLevel={4}
              theme={{
                light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
                dark: ['#fda4af', '#fb7185', '#e11d48', '#9f1239', '#4c0519'],
              }}
              labels={locales === 'es' ? {
                months: [
                  'Ene',
                  'Feb',
                  'Mar',
                  'Abr',
                  'May',
                  'Jun',
                  'Jul',
                  'Ago',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dic',
                ],
                weekdays: [
                  'Dom',
                  'Lun',
                  'Mar',
                  'Mie',
                  'Jue',
                  'Vie',
                  'Sab',
                ],
                totalCount: '{{count}} contribuciones',
                legend: {
                  less: 'Menos',
                  more: 'Más',
                },
              }
                : locales === 'tr' ? {
                  months: [
                    'Oca',
                    'Şub',
                    'Mar',
                    'Nis',
                    'May',
                    'Haz',
                    'Tem',
                    'Ağu',
                    'Eyl',
                    'Eki',
                    'Kas',
                    'Ara',
                  ],
                  weekdays: [
                    'Paz',
                    'Pzt',
                    'Sal',
                    'Çar',
                    'Per',
                    'Cum',
                    'Cts',
                  ],
                  totalCount: '{{count}} katkı',
                  legend: {
                    less: 'Daha az',
                    more: 'Daha fazla',
                  },
                } : {
                  months: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  weekdays: [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                  ],
                  totalCount: '{{count}} contributions',
                  legend: {
                    less: 'Less',
                    more: 'More',
                  },
                }}
              showWeekdayLabels
              renderBlock={(block, activity) =>
              // eslint-disable-next-line react/no-clone-element
                React.cloneElement(block, {
                  'data-tooltip-id': 'react-tooltip',
                  'data-tooltip-html': `
                  <div class="space-y-3">
                  <div class="pb-2 flex items-center text-[11px] uppercase">
                  <span class="mr-2 h-4 w-1 rounded-full bg-red-500 dark:bg-red-300"></span>
                  <p>
                  ${format.dateTime(new Date(activity.date), {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
                  </p>
                  </div>
                  <span class="text-gray-800 dark:text-white">
                  ${t('about-me.charts.githubContributions.total-count', {
          total: activity.count,
        })}
                  </span>
                  </div>
                  `,
                  'data-tooltip-variant': resolvedTheme === 'light' ? 'light' : 'dark',
                })}
            />
            <ReactTooltip id="react-tooltip" style={{ borderRadius: 16 }} className="border border-border shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" clickable />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default GithubContributions
