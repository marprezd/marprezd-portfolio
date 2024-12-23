'use client'

import type { Locale } from '@/i18n/routing'
import type { ChangeEvent } from 'react'
import { routing, usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { Select, SelectItem } from '@nextui-org/select'
import { IconLanguage } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()
  const t = useTranslations('site')
  const [isPending, startTransition] = useTransition()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale },
      )
    })
  }

  return (
    <div>
      <p className="font-medium text-cyan-950 dark:text-gray-100">{t('footer.settings.locale-switcher.title')}</p>
      <div className="mt-1 flex flex-col text-sm">
        <Select
          defaultSelectedKeys={[locale]}
          onChange={onSelectChange}
          label={t('footer.settings.locale-switcher.label')}
          className={cn(
            isPending && 'transition-opacity [&:disabled]:opacity-30',
          )}
          disabled={isPending}
          startContent={<IconLanguage className="text-cyan-950 dark:text-gray-100" />}
          size="lg"
          classNames={{
            trigger: cn(
              'bg-white dark:bg-gray-900',
              'data-[hover=true]:bg-white/70 dark:data-[hover=true]:bg-gray-900/70',
              'group-data-[focus=true]:bg-primary-100',
            ),
            selectorIcon: cn(
              'absolute end-3 w-4 h-4 text-primary-950',
            ),
            value: cn(
              'group-data-[has-value=true]:text-cyan-950 dark:group-data-[has-value=true]:text-gray-100',
            ),
            listbox: cn(
              'dark:bg-gray-900',
            ),
            popoverContent: cn(
              'w-full p-1 overflow-hidden dark:bg-gray-900',
            ),
          }}
          listboxProps={{
            itemClasses: {
              base: cn([
                'rounded-md',
                'text-default-700',
                'transition-opacity',
                'data-[hover=true]:text-foreground',
                'data-[hover=true]:bg-primary-200',
                'dark:data-[hover=true]:bg-primary-50',
                'data-[selectable=true]:focus:bg-primary-50',
                'data-[pressed=true]:opacity-70',
                'data-[focus-visible=true]:ring-primary-500',
              ]),
            },
          }}
        >
          {routing.locales.map(cur => (
            <SelectItem key={cur}>
              {t('footer.settings.locale-switcher.locale', { locale: cur })}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
