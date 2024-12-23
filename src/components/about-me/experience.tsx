import { Card, CardBody } from '@nextui-org/card'
import { Chip } from '@nextui-org/chip'
import { Link } from '@nextui-org/link'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { IconBriefcaseFilled } from '@tabler/icons-react'
import { useFormatter } from 'next-intl'
import React from 'react'

const experiences = [
  {
    name: 'Python Developer',
    company: 'Freelance',
    from: '2019-02-01',
    to: '2019-02-01',
    content:
      'I have been working on the development of personal projects. Design, maintenance, and deployment of RESTful APIs Web Service from scratch using the Django or FastAPI frameworks.',
    url: '',
  },
]

export default function Experience() {
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
          {experiences.map((job) => {
            const startDateTime = new Date(job.from)
            const endDateTime = new Date(job.to)

            return (
              <div key={job.name}>
                <div className="group relative flex gap-x-3 rounded-lg bg-transparent">
                  <div className="relative after:absolute after:inset-y-0 after:start-[0.8rem] after:w-px after:translate-x-px after:bg-default-500 last:after:hidden">
                    <div className="relative z-10 flex size-7 items-center justify-center">
                      <div className="size-2 rounded-full border-2 border-default-500 bg-default-500" />
                    </div>
                  </div>
                  <div className="grow p-2 pb-8">
                    <h3 className="text-defaultbg-default-900 flex font-semibold">
                      {job.name}
                    </h3>
                    <div className="mt-0.5">
                      <p className="text-xs font-medium uppercase text-default-600">
                        <time dateTime={job.from}>
                          {format.dateTime(startDateTime, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                        {' '}
                        -
                        {' '}
                        {job.to === job.from
                          ? (
                              <span>Current</span>
                            )
                          : (
                              <time dateTime={job.to}>
                                {format.dateTime(endDateTime, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </time>
                            )}
                      </p>
                    </div>
                    <p className="my-1.5 text-sm text-default-800">
                      {job.content}
                    </p>
                    <Link isExternal href={job.url}>
                      <Chip
                        variant="solid"
                        color="secondary"
                        startContent={<IconBriefcaseFilled size={16} />}
                      >
                        {job.company}
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
