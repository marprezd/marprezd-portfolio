/* eslint-disable style/multiline-ternary */
'use client'
import type { Stats } from '@/types'
import { useFormatter, useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { ActivityCalendar } from 'react-activity-calendar'
import { useInView } from 'react-intersection-observer'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

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
  const locales = useLocale()
  const t = useTranslations('site')
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
        <div className="flex items-center justify-center">
          <ActivityCalendar
            data={series}
            maxLevel={4}
            theme={{
              light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
              dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
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
                'data-tooltip-html': `${t('about-me.charts.githubContributions.total-count', {
                  date: format.dateTime(new Date(activity.date), {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }),
                  total: activity.count,
                })}`,
              })}
          />
          <ReactTooltip id="react-tooltip" />
        </div>
      )}
    </div>
  )
}

export default GithubContributions
