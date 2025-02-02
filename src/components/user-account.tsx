import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconUser } from '@tabler/icons-react'
import { auth } from 'auth'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { SignIn, SignOut } from './account-login-buttons'

export default async function UserAccount() {
  const session = await auth()
  // get the first character of each word
  const fullName = session?.user?.name
  const words = fullName?.split(' ')
  const acronyms = words?.map(acronym => acronym[0])
  const t = await getTranslations('app')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session
          ? (
              <Avatar className="size-[2.30rem] rounded-lg">
                <AvatarImage
                  src={`${session.user?.image}`}
                  alt={`${session.user?.name}`}
                />
                <AvatarFallback className="rounded-lg text-xs">
                  {acronyms}
                </AvatarFallback>
              </Avatar>
            )
          : (
              <Button variant="outline" size="icon">
                <IconUser className="size-[1.2rem]" />
              </Button>
            )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {session
          ? (
              <>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {t('guest-book.user.greeting', { user: session.user?.name })}
                    </p>
                    <p className="text-xs leading-none text-gray-700 dark:text-gray-300">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <SignOut />
              </>
            )
          : (
              <>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {t('guest-book.not-user.label')}
                    </p>
                    <p className="text-xs leading-none text-gray-700 dark:text-gray-300">
                      {t('guest-book.not-user.description')}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <SignIn />
              </>
            )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
