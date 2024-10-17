'use client'

import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { NavbarItem } from '@nextui-org/navbar'
import { Tooltip } from '@nextui-org/tooltip'
import { IconHeartFilled } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'

function Loading() {
  return null
/*   return (
    <NavbarItem className="mt-1.5 hidden animate-pulse md:block">
      <div className="inline-flex size-10 min-w-10 items-center justify-center rounded-medium bg-white dark:bg-palettes-primary-30">
      </div>
    </NavbarItem>
  ) */
}

export default function SponsorButton() {
  const t = useTranslations('site')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Loading />
  }

  return (
    <NavbarItem className="hidden animate-jump animate-delay-500 animate-duration-500 animate-once md:block">
      <Tooltip
        content={t('header.sponsor.tooltip')}
        showArrow
      >
        <Button
          isExternal
          isIconOnly
          as={Link}
          href="https://wise.com/share/marioantoniop5"
          color="primary"
          variant="flat"
        >
          <IconHeartFilled />
        </Button>
      </Tooltip>
    </NavbarItem>
  )
}
