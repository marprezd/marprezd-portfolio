import type { Post } from '#site/content'
import React from 'react'
import Animation from '../animation'
import PostCard from './post-card'

interface PostSeriesGridsProps {
  posts: Post[]
}

export default function PostGrid({
  posts,
}: PostSeriesGridsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {posts.slice(0, 4).map(post => (
        <article key={post.slugAsParams}>
          <Animation>
            <PostCard post={post} />
          </Animation>
        </article>
      ))}
    </div>
  )
}
