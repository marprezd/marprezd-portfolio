/* eslint-disable node/prefer-global/process */
import { neon } from '@neondatabase/serverless'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import React from 'react'
import DefaultLoadingSkeleton from '../default-loading-skeleton'

async function getData() {
  const sql = neon(`${process.env.NEON_DATABASE_URL}`)
  const response = await sql(`SELECT * from "Guestbook" ORDER BY "created_at" DESC`)

  return response
}

function Loading() {
  return <DefaultLoadingSkeleton />
}

const LazyListItems = dynamic(
  () => import('./list-items'),
  {
    loading: () => <Loading />,
  },
)

export default async function GuestbookUserList() {
  const data = await getData()
  const t = await getTranslations('app')
  return (
    <div className="py-10">
      <ul className="flex flex-col gap-y-2.5">
        {data.length > 0
          ? data.map(item => <LazyListItems key={item.id} item={item} />)
          : (
              <li className="block items-center">
                <div className="text-center">{t('guest-book.empty')}</div>
              </li>
            )}
      </ul>
    </div>
  )
}
