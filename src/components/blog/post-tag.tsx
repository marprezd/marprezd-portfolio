import type { ReactNode } from 'react'

interface PostTagProps {
  children: ReactNode
}

function PostTag({ children }: PostTagProps) {
  return (
    <span className="inline-flex items-center gap-x-1.5 bg-neutral-100 dark:bg-neutral-500/20 px-3 py-1.5 rounded-full font-medium text-neutral-800 dark:text-neutral-300 text-xs">
      <span className="inline-block">#</span>
      {children}
    </span>
  )
}

export default PostTag
