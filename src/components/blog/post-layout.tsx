import type { Post } from '#site/content'
import type { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import ProseLayout from '../prose-layout'
import Comments from './comments'
import PostAuthor from './post-author'
import PostContent from './post-content'
import PostCover from './post-cover'
// import PostFooter from './post-footer'
import PostHeader from './post-header'
import PostMeta from './post-meta'
import { PostSeries } from './post-series'
// import ProgrammingQuiz from './programming-quiz'
import RelatedPosts from './related-posts'
import SharePost from './share-post'
import TocDesktop, { TocMobile } from './toc'

interface PostLayoutProps {
  post: Post
  children: ReactNode
  similarPosts?: Post[]
}

export default function PostLayout({ children, post, similarPosts }: PostLayoutProps) {
  const moreThanOneHeading = post?.toc && post.toc.length
  const t = useTranslations('app')

  return (
    <article className="w-full gap-2">
      <PostHeader>
        <PostMeta
          title={post.title}
          date={post.date}
          lastModified={post.lastModified}
          otherLanguages={post.otherLanguages}
          slug={post.slug}
          excerpt={post.excerpt}
          tags={post.tags}
          readingTime={post.metadata.readingTime}
          wordCount={post.metadata.wordCount}
          view={post.slugAsParams}
        />
        <PostCover
          author={post.cover.author}
          creditLink={post.cover.creditLink}
          hostName={post.cover.hostName}
          title={post.title}
          url={post.cover.image}
          categories={post.categories}
        />
      </PostHeader>
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
              'max-w-none',
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
            <Tabs defaultValue="author" className="not-prose mt-10">
              <TabsList className="flex h-auto w-full flex-wrap items-center justify-start">
                <TabsTrigger value="author">{t('blog.tabs.list.author')}</TabsTrigger>
                {post.series && <TabsTrigger value="serie">{t('blog.tabs.list.series')}</TabsTrigger>}
                <TabsTrigger value="share">{t('blog.tabs.list.share')}</TabsTrigger>
                <TabsTrigger value="comments">{t('blog.tabs.list.comments')}</TabsTrigger>
                {similarPosts?.length ? <TabsTrigger value="related">{t('blog.tabs.list.related')}</TabsTrigger> : ''}
              </TabsList>
              <TabsContent value="author">
                <PostAuthor />
              </TabsContent>
              {post.series && (
                <TabsContent value="serie">
                  <PostSeries data={post.series} />
                </TabsContent>
              )}
              <TabsContent value="share">
                <SharePost post={post} />
              </TabsContent>
              <TabsContent value="comments">
                <Comments />
              </TabsContent>
              {similarPosts?.length
                ? (
                    <TabsContent value="related">
                      <RelatedPosts posts={similarPosts} />
                    </TabsContent>
                  )
                : ''}
            </Tabs>
          </ProseLayout>
        </div>
      </PostContent>
      {/* Todo:
      <PostFooter>
         <ProgrammingQuiz />
      </PostFooter>
       */}
    </article>
  )
}
