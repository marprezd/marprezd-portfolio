'use client'

import { Link } from '@/i18n/routing'
import { Avatar as NextAvatar } from '@nextui-org/avatar'
import { NavbarBrand } from '@nextui-org/navbar'
import React from 'react'

function Loading() {
  return (
    <div className="flex animate-pulse items-center space-x-2">
      <div className="size-8 rounded-full bg-white dark:bg-palettes-primary-30"></div>
      <div className="hidden h-4 w-32 rounded bg-white dark:bg-palettes-primary-30 sm:flex"></div>
    </div>
  )
}

export default function Avatar() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Loading />
  }

  return (
    <NavbarBrand as="li">
      <Link className="flex animate-jump items-center justify-start gap-1 animate-delay-500 animate-duration-500 animate-once" href="/">
        <NextAvatar
          isBordered
          showFallback
          color="primary"
          name="MP"
          size="sm"
          src="https://res.cloudinary.com/dieoeaoiy/image/upload/bo_0px_solid_rgb:ffffff,c_fill,f_auto,g_face:auto,h_50,o_100,q_auto:best,r_0,w_50/v1662047991/profile_uezzbj.jpg"
        />
        <p className="mx-2 hidden font-bold text-palettes-primary-25 dark:text-palettes-primary-90 sm:flex">MARPREZD</p>
      </Link>
    </NavbarBrand>
  )
}
