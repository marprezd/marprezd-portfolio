'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { useFormatter } from 'next-intl'
import React from 'react'

interface ListItemsProps {
  item: any
}

export default function ListItems({ item }: ListItemsProps) {
  const format = useFormatter()
  return (
    <li className="border-default-300 z-10 inline-flex items-center gap-x-2 rounded-xl border px-4 py-3 shadow-md">
      <Avatar className="size-8 rounded-lg">
        <AvatarImage src={`${item.image}`} alt={`${item.created_by}`} />
        <AvatarFallback className="rounded-lg">{`${item.created_by}`.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="overflow-hidden">
        <h3 className="text-sm font-semibold uppercase">
          {item.created_by}
          <time dateTime={item.created_at}>
            <span className="font-normal">
              {' '}
              |
              {' '}
              {format.dateTime(new Date(item.created_at), {
                dateStyle: 'short',
                timeStyle: 'medium',
              })}
            </span>
          </time>
        </h3>
        <p className="text-default-700 inline-flex items-center text-sm">
          {item.message}
        </p>
      </div>
    </li>
  )
}
