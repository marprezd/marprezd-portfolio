import type { EmblaOptionsType } from 'embla-carousel'
import { useTranslations } from 'next-intl'
import { IconBrandAnaconda, IconBrandCpp, IconBrandDjango, IconBrandDocker, IconBrandFastApi, IconBrandFlask, IconBrandGit, IconBrandGraphql, IconBrandJava, IconBrandJavascript, IconBrandMarkdown, IconBrandMongodb, IconBrandNextJS, IconBrandPostgres, IconBrandPostman, IconBrandPython, IconBrandReactJS, IconBrandSupabase, IconBrandTailwindcs, IconBrandVSCode } from './icons'
import SkillsCarousel from './skills-carousel'

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

const OPTIONS: EmblaOptionsType = { loop: true, align: 'start' }

function Skills() {
  const t = useTranslations('site')

  return (
    <div>
      <div className="grid grid-flow-row auto-rows-max grid-cols-1 gap-4">
        <div className="text-3xl font-thin lg:text-4xl">
          {t('about-me.bio')}
        </div>
        <div className="flex items-center py-3 text-sm text-gray-800 before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">{t('about-me.technologies.title')}</div>
        <SkillsCarousel
          options={OPTIONS}
          techs={technologies}
        />
      </div>
    </div>
  )
}

export default Skills
