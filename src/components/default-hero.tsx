import React from 'react'
import CldImage from './cld-image'

interface Props {
  title: string
  description: string
}

export default function DefaultHero({ title, description }: Props) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full lg:col-span-6 lg:place-self-center">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-[2.6rem] lg:text-left">
          {title}
        </h1>
        <div>
          <p className="text-center text-gray-700 dark:text-gray-300 lg:text-left">
            {description}
          </p>
          <div className="text-center lg:text-left">
            <span className="inline-block h-1 w-40 rounded-full bg-red-500 dark:bg-red-400" />
            <span className="ml-1 inline-block h-1 w-3 rounded-full bg-red-500 dark:bg-red-400" />
            <span className="ml-1 inline-block size-1 rounded-full bg-red-500 dark:bg-red-400" />
          </div>
        </div>
      </div>
      <div className="col-span-full lg:col-span-6">
        <div className="flex w-auto max-w-md">
          <CldImage
            alt="Programmer Working"
            width={495}
            height={405}
            sizes="100vw"
            src="marprez-dev/hero/programmer-working_pvz8mu.png"
            crop={{
              width: 495,
              height: 405,
              type: 'fill',
            }}
            quality={75}
          />
        </div>
      </div>
    </div>
  )
}
