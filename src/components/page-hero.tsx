import React from 'react'

interface Props {
  title: string
  description: string
}

export default function PageHero({ title, description }: Props) {
  return (
    <div>
      <div className="container relative z-10 mx-auto space-y-4 py-10 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="block text-4xl font-bold md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
