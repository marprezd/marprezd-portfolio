import { createClient } from '@/lib/supabase/guest-book/server'
import { cookies } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import React, { Suspense } from 'react'
import GuestbookForm from './guest-book-form'
import GuestbookList from './guest-book-list'
import ParagraphSkeleton from './paragraph-skeleton'
import SignInWithGitHub from './sign-in-with-github'
import SignOut from './sign-out'

export default async function Main({
  searchParams,
}: {
  searchParams?: {
    submitted?: boolean
  }
}) {
  const t = await getTranslations('site')
  const supabaseClient = createClient(cookies())
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  if (!user) {
    return (
      <div>
        <section className="container mx-auto max-w-5xl space-y-10 px-2 xl:space-y-12">
          <div className="flex flex-col gap-2 animate-delay-500">
            <div className="flex flex-col items-center justify-center">
              <SignInWithGitHub />
            </div>
          </div>
          <div className="animation-delay-600 animate-fade py-10 animate-duration-1000 animate-fill-both">
            <Suspense fallback={<ParagraphSkeleton />}>
              <GuestbookList />
            </Suspense>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <section className="container mx-auto max-w-5xl space-y-10 px-2 py-10 xl:space-y-12">
        <div className="grow space-y-6">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <h2 className="text-lg font-medium leading-tight text-default-800">
              {t('guest-book.user.greeting', { user: user.user_metadata.user_name })}
              <span className="animate animate-wave animation-delay-1000">👋</span>
            </h2>
            <SignOut />
          </div>
          {searchParams?.submitted
            ? <span>{t('guest-book.user.submit-msg')}</span>
            : <GuestbookForm />}
        </div>
        <div className="flex items-center justify-center">
          <div className="animation-delay-600 animate-fade animate-duration-1000 animate-fill-both">
            <Suspense fallback={<ParagraphSkeleton />}>
              <GuestbookList />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  )
}
