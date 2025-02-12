import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Progress } from '@/components/ui/progress'
import { useTranslations } from 'next-intl'
import { IconBrandAnaconda, IconBrandCpp, IconBrandDjango, IconBrandDocker, IconBrandFastApi, IconBrandFlask, IconBrandGit, IconBrandGraphql, IconBrandJava, IconBrandJavascript, IconBrandMarkdown, IconBrandMongodb, IconBrandNextJS, IconBrandPostgres, IconBrandPostman, IconBrandPython, IconBrandReactJS, IconBrandSupabase, IconBrandTailwindcs, IconBrandVSCode } from './icons'

const technologies = [
  {
    title: 'C++',
    icon: <IconBrandCpp size={30} />,
    score: 10,
  },
  {
    title: 'NextJS',
    icon: <IconBrandNextJS size={30} />,
    score: 60,
  },
  {
    title: 'Postman',
    icon: <IconBrandPostman size={30} />,
    score: 90,
  },
  {
    title: 'Python',
    icon: <IconBrandPython size={30} />,
    score: 78,
  },
  {
    title: 'Postgres',
    icon: <IconBrandPostgres size={30} />,
    score: 70,
  },
  {
    title: 'Javascript',
    icon: <IconBrandJavascript size={30} />,
    score: 82,
  },
  {
    title: 'Anaconda',
    icon: <IconBrandAnaconda size={30} />,
    score: 76,
  },
  {
    title: 'ReactJS',
    icon: <IconBrandReactJS size={30} />,
    score: 75,
  },
  {
    title: 'Django',
    icon: <IconBrandDjango size={30} />,
    score: 70,
  },
  {
    title: 'Java',
    icon: <IconBrandJava size={30} />,
    score: 60,
  },
  {
    title: 'Docker',
    icon: <IconBrandDocker size={30} />,
    score: 63,
  },
  {
    title: 'Markdown',
    icon: <IconBrandMarkdown size={30} />,
    score: 100,
  },
  {
    title: 'VS Code',
    icon: <IconBrandVSCode size={30} />,
    score: 90,
  },
  {
    title: 'Graphql',
    icon: <IconBrandGraphql size={30} />,
    score: 68,
  },
  {
    title: 'Mongodb',
    icon: <IconBrandMongodb size={30} />,
    score: 80,
  },
  {
    title: 'Git',
    icon: <IconBrandGit size={30} />,
    score: 90,
  },
  {
    title: 'Flask',
    icon: <IconBrandFlask size={30} />,
    score: 70,
  },
  {
    title: 'Supabase',
    icon: <IconBrandSupabase size={30} />,
    score: 76,
  },
  {
    title: 'Tailwindcss',
    icon: <IconBrandTailwindcs size={30} />,
    score: 90,
  },
  {
    title: 'FastAPI',
    icon: <IconBrandFastApi size={30} />,
    score: 72,
  },
]

export default function Skills() {
  const t = useTranslations('app')
  const skt = useTranslations('app.about-me.soft-skills')
  const skills = [
    'problem-solving',
    'time-management',
    'self-motivation',
    'adaptability',
    'team-collaboration',
    'critical-thinking',
    'persistence',
    'organization',
  ] as const
  return (
    <div className="mt-5 sm:mt-10 lg:mt-0">
      <div className="space-y-6 sm:space-y-4">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-3xl font-bold lg:text-4xl">
            {t('about-me.skills.title')}
          </h2>
          <p className="text-gray-600 dark:text-neutral-400">
            {t('about-me.skills.description')}
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
          }}
        >
          <div className="grid grid-cols-1 gap-y-6">
            <CarouselContent>
              {technologies.slice(0, technologies.length).map(tech => (
                <CarouselItem key={tech.title} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="shadow-sm">
                      <CardHeader>
                        <div className="flex flex-row items-center space-x-2 self-start">
                          {tech.icon}
                          <p>
                            {tech.title}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center">
                        <div className="flex w-full items-center justify-between font-mono">
                          <p className="text-xs text-gray-800 dark:text-white">{t('about-me.skills.average')}</p>
                          <span className="text-xs text-gray-800 dark:text-white">
                            {tech.score}
                            %
                          </span>
                        </div>
                        <Progress value={tech.score} />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-between">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>
        <ul className="flex flex-row flex-wrap items-center justify-start">
          {skills.map(key => (
            <li className="mr-2 flex items-center gap-x-2" key={key}>
              <span className="flex size-5 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-800/30 dark:text-cyan-500">
                <svg
                  className="size-3.5 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="grow">
                <span className="text-sm text-gray-600 dark:text-neutral-400 sm:text-base">
                  <span className="font-medium">
                    {skt(`${key}.title`)}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
