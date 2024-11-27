import { createClient } from '@/lib/supabase/guest-book/server'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
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
        <section className="container mx-auto max-w-2xl space-y-10 px-2 xl:space-y-12">
          <div className="flex flex-col gap-2 animate-delay-500">
            <div className="flex flex-col items-center justify-center">
              <SignInWithGitHub />
            </div>
          </div>
          <div className="py-10">
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
      <section className="container mx-auto max-w-2xl space-y-10 px-2 xl:space-y-12">
        <Card className="grow">
          <CardHeader className="flex flex-col items-center justify-between lg:flex-row">
            <h2 className="text-xl font-light">
              {t('guest-book.user.greeting', { user: user.user_metadata.user_name })}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
                className="animate mr-2.5 inline-flex animate-wiggle-more animate-delay-500 animate-duration-500 animate-infinite"
              >
                <path fill="#eab308" fillRule="evenodd" d="M4.414 17.859a.75.75 0 0 1 1.025.27c.827 1.418 2.091 2.49 3.65 3.186a.75.75 0 0 1-.611 1.37c-1.812-.809-3.331-2.08-4.334-3.8a.75.75 0 0 1 .27-1.026M18.906 3.922c-1.014-1.036-2.46-1.417-3.876-1.015a.75.75 0 0 1-.41-1.442c1.938-.552 3.955-.025 5.358 1.408a.75.75 0 0 1-1.072 1.049m-7.716-.614c-.214-.367-.838-.59-1.471-.227c-.632.36-.743.997-.532 1.357l2.525 4.332a.75.75 0 0 1-1.296.755L7.05 3.75c-.214-.367-.838-.59-1.472-.227c-.631.36-.742.997-.532 1.357l3.789 6.497a.75.75 0 1 1-1.296.756L5.854 9.245c-.214-.367-.838-.59-1.471-.227c-.632.36-.743.996-.532 1.357l3.788 6.497c1.609 2.759 5.58 3.654 8.946 1.73s4.561-5.764 2.956-8.517l-2.526-4.331c-.214-.367-.838-.59-1.471-.228c-.632.361-.743.997-.532 1.358l1.683 2.887a.75.75 0 0 1-.275 1.03c-1.543.88-2.016 2.585-1.34 3.743a.75.75 0 1 1-1.296.756c-.913-1.565-.544-3.45.635-4.782c.33-.372.442-.914.192-1.344z" clipRule="evenodd"></path>
              </svg>
            </h2>
            <SignOut />
          </CardHeader>
          <CardBody>
            {searchParams?.submitted
              ? <span>{t('guest-book.user.submit-msg')}</span>
              : <GuestbookForm />}
          </CardBody>
        </Card>
        <div className="py-10">
          <Suspense fallback={<ParagraphSkeleton />}>
            <GuestbookList />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
