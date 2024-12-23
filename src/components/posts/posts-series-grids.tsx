'use client'

import type { Post } from '#site/content'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import PostCard from './post-card'

interface PostSeriesGridsProps {
  posts: Post[]
}

export default function PostSeriesGrids({
  posts,
}: PostSeriesGridsProps) {
  const { ref, inView } = useInView(
    {
      threshold: 0.2,
    },
  )
  return (
    <div>
      <div ref={ref} className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${inView ? 'animate-fade animate-delay-1000 animate-duration-1000 animate-once animate-ease-in' : 'opacity-0'}`}>
        {posts.slice(0, 4).map(post => (
          <article key={post.slugAsParams}>
            <PostCard post={post} shadow="md" />
          </article>
        ))}
      </div>
    </div>
  )
}
