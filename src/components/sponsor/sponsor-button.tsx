'use client'

import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { NavbarItem } from '@nextui-org/navbar'
import { Tooltip } from '@nextui-org/tooltip'
import { IconHeartFilled } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function SponsorButton() {
  const t = useTranslations('site')

  return (
    <NavbarItem className="hidden animate-pulse animate-delay-[2500ms] animate-duration-[2500ms] animate-infinite animate-ease-in-out md:block">
      <Tooltip
        content={t('header.sponsor.tooltip')}
        showArrow
      >
        <Button
          isExternal
          isIconOnly
          as={Link}
          href="https://wise.com/share/marioantoniop5"
          color="secondary"
          variant="flat"
          size="sm"
        >
          <IconHeartFilled size={20} />
        </Button>
      </Tooltip>
    </NavbarItem>
  )
}
