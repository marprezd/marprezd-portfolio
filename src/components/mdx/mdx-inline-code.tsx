import type React from 'react'

import { cn } from '@/lib/utils'

type MdxInlineCodeProps = React.HTMLAttributes<HTMLSpanElement>

export function MdxInlineCode({ className, ...restProps }: MdxInlineCodeProps) {
  return (
    <span className="inline-code">
      <code
        className={cn(
          className,
          'relative rounded px-[0.3rem] py-[0.2rem]',
        )}
        {...restProps}
      />
    </span>
  )
}
