'use client'

import type { FC } from 'react'
import { cn } from '@/lib/utils'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { IconMoonStars, IconSunFilled } from '@tabler/icons-react'
import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function CustomRadio(props: any) {
  const { children, ...otherProps } = props

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-white dark:bg-cyan-900 hover:bg-white/70 dark:hover:bg-cyan-900/70 items-center justify-between',
          'flex-row-reverse max-w-md cursor-pointer rounded-lg gap-4 p-2.5 border-2 border-transparent',
          'data-[selected=true]:border-primary',
        ),
        wrapper: cn(
          'group-data-[selected=true]:border-primary',
          'border-cyan-100',
          'group-data-[hover-unselected=true]:bg-cyan-200 dark:group-data-[hover-unselected=true]:bg-cyan-700',
        ),
      }}
    >
      {children}
    </Radio>
  )
}

export const ThemeSwitcher: FC = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('site')

  const handleClick = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark')
    }
    else {
      setTheme('light')
    }
  }

  const formik = useFormik({
    initialValues: {
      item: 'light',
    },
    validate: () => {
      handleClick()
    },
    onSubmit: () => {},
  })

  const radioBtns = [
    {
      id: 'light',
      name: t('footer.settings.theme-switcher.light-theme'),
      value: 'light',
      icon: <IconSunFilled className="mr-1" size={18} />,
    },
    {
      id: 'dark',
      name: t('footer.settings.theme-switcher.dark-theme'),
      value: 'dark',
      icon: <IconMoonStars className="mr-1" size={18} />,
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return null

  return (
    <div>
      <p className="font-medium text-cyan-950 dark:text-cyan-50">{t('footer.settings.theme-switcher.title')}</p>
      <div className="mt-1 flex flex-col rounded-xl bg-white p-3 text-sm dark:bg-cyan-900">
        <form onSubmit={formik.handleSubmit}>
          <RadioGroup
            defaultValue={resolvedTheme}
            label={t('footer.settings.theme-switcher.label')}
          >
            {radioBtns.map((btn) => {
              return (
                <CustomRadio
                  key={btn.value}
                  {...btn}
                  checked={formik.values.item === btn.value}
                  onChange={() => { formik.setFieldValue('item', btn.value) }}
                >
                  <div className="flex items-center">
                    {btn.icon}
                    {btn.name}
                  </div>
                </CustomRadio>
              )
            })}
          </RadioGroup>
        </form>
      </div>
    </div>
  )
}

export default ThemeSwitcher
