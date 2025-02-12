import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { IconDownload, IconPlus } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import CldImage from '../cld-image'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

const jobNetworks = [
  {
    title: 'Upwork',
    url: 'https://www.upwork.com/freelancers/~01a1f8e2b1102f34ef?mp_source=share',
  },
]

export default function ProfileCard() {
  const t = useTranslations('app')
  const yearsExperience = Math.floor((new Date().getTime() - new Date('2019-08-13').getTime()) / 3.15576e10)
  return (
    <Card>
      <CardHeader className="flex flex-col items-center space-y-2">
        <CldImage
          className="size-24 rounded-full shadow-lg"
          alt="MP"
          width={96}
          height={96}
          sizes="100vw"
          src="profile_uezzbj.jpg"
          crop={{
            type: 'fill',
          }}
          quality={75}
          priority
        />
        <CardTitle className="text-2xl">
          Mario Pérez
        </CardTitle>
        <CardDescription className="flex flex-col items-center space-y-1">
          <p>Middle Software Developer</p>
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800 dark:bg-red-950 dark:text-red-300">
            {yearsExperience}
            {' '}
            {t('about-me.experience')}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-gray-700 dark:text-gray-300">
        {t('about-me.bio')}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        {jobNetworks && (
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="rounded-full">
                      <IconPlus />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('about-me.hire-me')}</p>
                  <TooltipPrimitive.Arrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent className="min-w-52">
              <DropdownMenuLabel>{t('about-me.job-networks')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {jobNetworks.map(network => (
                <DropdownMenuItem key={network.title} asChild>
                  <a
                    href={network.url}
                    rel="noopener"
                    target="_blank"
                  >
                    {network.title}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button
          variant="ghost"
          size="sm"
        >
          <IconDownload />
          {t('about-me.download')}
        </Button>
      </CardFooter>
    </Card>
  )
}
