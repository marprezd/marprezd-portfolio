/* eslint-disable node/prefer-global/process */
'use client'

import { createClient } from '@/lib/supabase/guest-book/client'
import { Button } from '@nextui-org/button'
import { IconBrandGithub } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export default function SignInWithGitHub() {
  const t = useTranslations('site')

  async function signInWithGitHub() {
    const supabase = createClient()
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SIGNIN_REDIRECT_URL,
      },
    })
  }

  return (
    <Button color="primary" onClick={signInWithGitHub} startContent={<IconBrandGithub />}>
      {t('guest-book.user.sign-in')}
    </Button>
  )
}
