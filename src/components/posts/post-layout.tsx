import type { Post } from '#site/content'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import React from 'react'
import ProseLayout from '../prose-layout'
import AuthorBiography from './author-biography'
import Comments from './comments'
import PostContent from './post-content'
import PostCover from './post-cover'
import PostMeta from './post-meta'
import { PostSeries } from './post-series'
import PostShare from './post-share'
import PostStats from './post-stats'
import TocDesktop, { TocMobile } from './toc'

interface PostLayoutProps {
  post: Post
  children: ReactNode
}

export default function PostLayout({ children, post }: PostLayoutProps) {
  const moreThanOneHeading = post?.toc && post.toc.length

  return (
    <main>
      <section className="container mx-auto max-w-7xl pb-10 md:pb-12 lg:pb-16">
        <div className={cn(
          'flex flex-col-reverse gap-8',
          'lg:flex-row [&>*]:flex-1',
        )}
        >
          <PostMeta
            title={post.title}
            date={post.date}
            lastModified={post.lastModified}
            otherLanguages={post.otherLanguages}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
          <PostCover
            author={post.cover.author}
            creditLink={post.cover.creditLink}
            hostName={post.cover.hostName}
            title={post.title}
            url={post.cover.image}
            categories={post.categories}
          />
        </div>
      </section>
      <section className="border-y border-gray-300 bg-content1 px-4 py-10 dark:border-gray-700">
        <PostStats
          slug={post.slugAsParams}
          readingTime={post.metadata.readingTime}
          wordCount={post.metadata.wordCount}
        />
      </section>
      <section className="container mx-auto py-10 md:py-12 lg:py-16">
        <PostContent>
          {moreThanOneHeading && (
            <TocDesktop
              className={cn(
                'hidden w-3/12 lg:block self-start sticky top-32',
              )}
              toc={post.toc}
            />
          )}
          <div className="size-full lg:w-9/12">
            <ProseLayout
              className={cn(
                'max-w-none lg:pr-8',
                post.toc.length < 1 && 'mx-auto',
              )}
            >
              {moreThanOneHeading && (
                <TocMobile
                  className="lg:hidden"
                  toc={post.toc}
                />
              )}
              {children}
            </ProseLayout>
            {post.series && (
              <PostSeries data={post.series} />
            )}
          </div>
        </PostContent>
      </section>
      <section className="mx-auto border-y border-gray-300 bg-default-50 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
              <div className="space-y-6 lg:space-y-10">
                <AuthorBiography />
              </div>
              <div className="space-y-6 lg:space-y-10">
                <PostShare post={post} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-20 lg:px-8">
        {/* Comments */}
        <Comments />
      </section>
    </main>
  )
}
