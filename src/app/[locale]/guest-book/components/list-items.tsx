'use client'

import { Avatar } from '@nextui-org/avatar'
import { useFormatter } from 'next-intl'
import React from 'react'

interface ListItemsProps {
  message: any
}
export default function ListItems({ message }: ListItemsProps) {
  const format = useFormatter()

  return (
    <li className="inline-flex items-center gap-x-2 rounded-lg bg-default-50 px-4 py-3 shadow-md">
      <Avatar
        src={`${message.avatar}`}
        fallback={`${message.username}`.substring(0, 2)}
        alt={`${message.username}`}
      />
      <div className="overflow-hidden">
        <h3 className="text-sm font-semibold uppercase">
          {message.username}
          <time dateTime={message.created_at}>
            <span className="font-normal">
              {' '}
              |
              {' '}
              {format.dateTime(new Date(message.created_at), {
                dateStyle: 'short',
                timeStyle: 'medium',
              })}
            </span>
          </time>
        </h3>
        <p className="inline-flex items-center text-sm text-default-700">
          {message.message}
        </p>
      </div>
    </li>
  )
}
