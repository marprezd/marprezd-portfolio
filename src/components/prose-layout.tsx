import { cn } from '@/lib/utils'

function ProseLayout({
  children,
  className,
  ...restProps
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('prose prose-neutral dark:prose-invert prose-headings:font-bold prose-code:before:hidden prose-code:after:hidden', className)}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default ProseLayout
