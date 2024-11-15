import { cn } from '@/lib/utils'

function ProseLayout({
  children,
  className,
  ...restProps
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('prose prose-custom prose-neutral dark:prose-invert prose-headings:font-light prose-headings:tracking-tighter', className)}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default ProseLayout
