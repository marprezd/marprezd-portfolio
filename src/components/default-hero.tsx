import React from 'react'

interface Props {
  title: string
  description: string
}

export default function DefaultHero({ title, description }: Props) {
  return (
    <div className="flex flex-col space-y-4 py-10">
      <h1 className="block text-4xl font-bold md:text-5xl">
        {title}
      </h1>
      <div>
        <p className="text-gray-700 dark:text-gray-300">
          {description}
        </p>
        <div className="text-left">
          <span className="inline-block h-1 w-40 rounded-full bg-red-500 dark:bg-red-400" />
          <span className="ml-1 inline-block h-1 w-3 rounded-full bg-red-500 dark:bg-red-400" />
          <span className="ml-1 inline-block size-1 rounded-full bg-red-500 dark:bg-red-400" />
        </div>
      </div>
    </div>
  )
}
