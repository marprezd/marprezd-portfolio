import type { ReactNode } from 'react'

interface PostTagProps {
  children: ReactNode
}

function PostTag({ children }: PostTagProps) {
  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800 dark:bg-red-800 dark:text-white">
      <span className="align-middle">
        #
        {children}
      </span>
    </span>
  )
}

export default PostTag
