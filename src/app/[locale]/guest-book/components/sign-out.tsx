'use client'

import { createClient } from '@/lib/supabase/guest-book/client'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function SignOut() {
  const router = useRouter()
  const t = useTranslations('site')

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()

    router.refresh()
  }

  return (
    <Button
      color="primary"
      onClick={signOut}
      size="sm"
      variant="light"
    >
      {t('guest-book.user.sign-out')}
    </Button>
  )
}
