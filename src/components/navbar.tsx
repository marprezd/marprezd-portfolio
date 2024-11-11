'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import {
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { IconApps, IconChalkboard, IconFile, IconHome, IconMenu, IconMessages, IconUser, IconUsers, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import Avatar from './logo/avatar'
import MegamenuLink from './megamenu-link'
import SearchBox from './search/search-box'
import SponsorButton from './sponsor/sponsor-button'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const t = useTranslations('site')

  return (
    <NextUINavbar
      isBlurred={false}
      position="sticky"
      maxWidth="xl"
      className="bg-primary-100/70 backdrop-blur-lg"
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      isBordered
    >
      <NavbarContent>
        <Avatar />
      </NavbarContent>
      <NavbarContent className="flex items-center justify-center" justify="center">
        <SearchBox />
      </NavbarContent>
      <NavbarContent justify="end" className="gap-4">
        <SponsorButton />
        <NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            icon={isMenuOpen ? <IconX /> : <IconMenu />}
            className="animate-fade animate-delay-500 animate-duration-500 animate-once animate-ease-in"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="mt-0 md:overflow-hidden">
        <li className="block animate-fade-up animate-delay-500 animate-duration-1000 animate-once">
          <ScrollShadow className="h-[430px] touch-pan-y overflow-y-auto md:h-auto">
            <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-5 md:py-4">
              <div className="sm:py-1.5 md:col-span-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <div className="flex flex-col">
                      <div className="space-y-0.5">
                        <span className="mb-2 ms-2.5 text-xs font-semibold uppercase text-default-900">
                          {t('header.navigation.labels.main-menu')}
                        </span>
                        <ul>
                          <NavbarMenuItem>
                            <MegamenuLink
                              href="/"
                              // Close navigation bar after clicking on item.
                              onClick={() => {
                                setIsMenuOpen(prev => !prev)
                              }}
                            >
                              <IconHome className="mt-0.5 size-4 shrink-0" />
                              <div className="grow">
                                <p className="text-sm">
                                  {t('header.navigation.home')}
                                </p>
                              </div>
                            </MegamenuLink>
                          </NavbarMenuItem>
                          <NavbarMenuItem>
                            <MegamenuLink
                              href="/blog"
                              onClick={() => {
                                setIsMenuOpen(prev => !prev)
                              }}
                            >
                              <IconFile className="mt-0.5 size-4 shrink-0" />
                              <div className="grow">
                                <p className="text-sm">
                                  {t('header.navigation.blog')}
                                </p>
                              </div>
                            </MegamenuLink>
                          </NavbarMenuItem>
                          <NavbarMenuItem>
                            <MegamenuLink
                              href="/projects"
                              onClick={() => {
                                setIsMenuOpen(prev => !prev)
                              }}
                            >
                              <IconApps className="mt-0.5 size-4 shrink-0" />
                              <div className="grow">
                                <p className="text-sm">
                                  {t('header.navigation.projects')}
                                </p>
                              </div>
                            </MegamenuLink>
                          </NavbarMenuItem>
                          <NavbarMenuItem>
                            <MegamenuLink
                              href="/courses"
                              onClick={() => {
                                setIsMenuOpen(prev => !prev)
                              }}
                            >
                              <IconChalkboard className="mt-0.5 size-4 shrink-0" />
                              <div className="grow">
                                <p className="text-sm">
                                  {t('header.navigation.courses')}
                                </p>
                              </div>
                            </MegamenuLink>
                          </NavbarMenuItem>
                          <NavbarMenuItem>
                            <MegamenuLink
                              href="/about-me"
                              onClick={() => {
                                setIsMenuOpen(prev => !prev)
                              }}
                            >
                              <IconUser className="mt-0.5 size-4 shrink-0" />
                              <div className="grow">
                                <p className="text-sm">
                                  {t('header.navigation.about-me')}
                                </p>
                              </div>
                            </MegamenuLink>
                          </NavbarMenuItem>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <div className="space-y-0.5">
                        <span className="mb-2 ms-2.5 text-xs font-semibold uppercase text-default-900">
                          {t('header.navigation.labels.communities')}
                        </span>
                        <Link
                          className="flex gap-x-3 rounded-lg p-2 text-default-700 focus:bg-content2 focus:outline-none"
                          href="https://marprezd.substack.com/?r=3lz4aj&utm_campaign=pub-share-checklist"
                          isExternal
                          onClick={() => {
                            setIsMenuOpen(prev => !prev)
                          }}
                        >
                          <IconUsers className="mt-0.5 size-4 shrink-0" />
                          <div className="grow">
                            <p className="text-sm">
                              Substack
                            </p>
                          </div>
                        </Link>
                      </div>
                      <div className="mt-3 space-y-0.5 md:mt-7">
                        <span className="mb-2 ms-2.5 text-xs font-semibold uppercase text-default-900">
                          {t('header.navigation.labels.feedbacks')}
                        </span>
                        {/* Link */}
                        <MegamenuLink
                          href="/guest-book"
                          onClick={() => {
                            setIsMenuOpen(prev => !prev)
                          }}
                        >
                          <IconMessages className="mt-0.5 size-4 shrink-0" />
                          <div className="grow">
                            <p className="text-sm">
                              {t('header.navigation.guest-book')}
                            </p>
                          </div>
                        </MegamenuLink>
                        {/* End Link */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="flex w-full flex-col space-y-4">
                  <Card className="max-w-full">
                    <CardHeader>
                      <span className="text-xs font-semibold uppercase text-default-900">
                        {t('header.navigation.challenges.label')}
                      </span>
                    </CardHeader>
                    <CardBody className="flex flex-col">
                      <Link
                        className="group inline-block items-center gap-y-4 focus:outline-none md:items-start md:gap-2"
                        href="/test-knowledge"
                        onClick={() => {
                          setIsMenuOpen(prev => !prev)
                        }}
                      >
                        <div className="w-full">
                          <p className="text-sm text-default-700">
                            {t('header.navigation.challenges.description')}
                          </p>
                          <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-medium text-primary decoration-2 hover:underline hover:opacity-85">
                            {t('header.navigation.more-details')}
                            <svg
                              className="size-4 shrink-0 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
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
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </p>
                        </div>
                      </Link>
                    </CardBody>
                  </Card>
                  <Card className="max-w-full">
                    <CardHeader>
                      <span className="text-xs font-semibold uppercase text-default-900">
                        {t('header.navigation.hire-me.label')}
                      </span>
                    </CardHeader>
                    <CardBody className="flex flex-col">
                      <Link
                        className="group flex flex-col items-center gap-y-4 focus:outline-none md:items-start md:gap-2"
                        href="/hire-me"
                        onClick={() => {
                          setIsMenuOpen(prev => !prev)
                        }}
                      >
                        <div className="w-full">
                          <p className="text-sm text-default-700">
                            {t('header.navigation.hire-me.description')}
                          </p>
                          <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-medium text-primary decoration-2 hover:underline hover:opacity-85">
                            {t('header.navigation.more-details')}
                            <svg
                              className="size-4 shrink-0 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
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
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </p>
                        </div>
                      </Link>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </ScrollShadow>
        </li>
      </NavbarMenu>
    </NextUINavbar>
  )
}
