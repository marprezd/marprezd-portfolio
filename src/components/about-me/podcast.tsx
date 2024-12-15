import { Card, CardBody } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Link } from '@nextui-org/link'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { IconMicrophoneFilled, IconSpeakerphone } from '@tabler/icons-react'
import { useFormatter } from 'next-intl'
import React from 'react'

const podcasts = [
  {
    title: 'Coming soon!',
    categories: 'Coming soon',
    date: '2024-09-06 18:11:15',
    description:
      'A brand new podcast you won\'t want to miss! Stay tuned for the latest updates and be the first to listen to this exciting new post.',
    url: 'https://marprezd.substack.com/',
    language: 'español - english - türkçe',
  },
]

export default function Podcast() {
  const format = useFormatter()

  return (
    <Card className="bg-white hover:scale-105 dark:bg-gray-950">
      <CardBody>
        <ScrollShadow className="h-[210px] overflow-y-auto
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  [&::-webkit-scrollbar]:w-1.5"
        >
          {podcasts.map((item) => {
            const dateTime = new Date(item.date)

            return (
              <div key={item.title}>
                <div className="group relative flex gap-x-3 rounded-lg bg-transparent">
                  <div className="relative after:absolute after:inset-y-0 after:start-[0.8rem] after:w-px after:translate-x-px after:bg-default-500 last:after:hidden">
                    <div className="relative z-10 flex size-7 items-center justify-center">
                      <div className="size-2 rounded-full border-2 border-default-500 bg-default-500" />
                    </div>
                  </div>
                  <div className="grow p-2 pb-8">
                    <h3 className="flex items-center font-semibold text-default-900">
                      {item.title}
                      {' '}
                      <IconSpeakerphone className="ms-1.5" />
                    </h3>
                    <div className="mt-0.5">
                      <p className="text-xs font-medium uppercase text-default-600">
                        <time dateTime={item.date}>
                          {format.dateTime(dateTime, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                        {' '}
                        |
                        {' '}
                        {item.language}
                      </p>
                    </div>
                    <p className="my-1.5 text-sm text-default-800">
                      {item.description}
                    </p>
                    <Link isExternal href={item.url}>
                      <Chip
                        variant="solid"
                        color="secondary"
                        startContent={<IconMicrophoneFilled size={16} />}
                      >
                        {item.categories}
                      </Chip>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollShadow>
      </CardBody>
    </Card>
  )
}
