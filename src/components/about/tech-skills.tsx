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

export default function TechSkills() {
  const t = useTranslations('app')

  return (
    <div className="space-y-5 md:space-y-10 lg:space-y-20">
      <div className="mx-auto flex max-w-2xl">
        <div className="flex w-full items-center py-3 text-2xl font-bold text-gray-800 before:me-6 before:flex-1 before:border-t before:border-gray-400 after:ms-6 after:flex-1 after:border-t after:border-gray-400 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">
          {t('about-me.tech-skills.title')}
        </div>
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
                        <p className="text-xs text-gray-800 dark:text-white">{t('about-me.tech-skills.average')}</p>
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
    </div>
  )
}
