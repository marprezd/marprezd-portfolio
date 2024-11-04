import { IconFile } from '@tabler/icons-react'
import React from 'react'

interface TotalPostsProps {
  postLenght: number
  label: string
}

export default function TotalPosts({ postLenght, label }: TotalPostsProps) {
  return (
    <div>
      <IconFile className="mx-auto size-6 shrink-0 text-cyan-200 sm:size-8" />
      <div className="mt-3 sm:mt-5">
        <h3 className="text-lg font-semibold text-white sm:text-3xl">
          {postLenght}
        </h3>
        <p className="mt-1 text-sm text-white sm:text-base">
          {label}
        </p>
      </div>
    </div>
  )
}
