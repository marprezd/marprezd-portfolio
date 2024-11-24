/* eslint-disable no-console */
'use server'

import { createClient } from '@/lib/supabase/guest-book/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

export default async function submitGuestbookMessage(formData: FormData) {
  const supabaseClient = createClient(cookies())
  const message = formData.get('message') as string
  const t = await getTranslations('site')

  if (!message) {
    throw new Error(t('guest-book.not-msg-error'))
  }

  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  if (!user) {
    throw new Error(t('guest-book.not-user-error'))
  }

  const { avatar_url: avatar, user_name: username } = user.user_metadata

  const { error, status, statusText } = await supabaseClient.from('guestbook').insert({
    message,
    avatar,
    username,
  })

  console.log({ error, status, statusText })

  revalidatePath('/guest-book')
  redirect('/guest-book?submitted=true')
}
