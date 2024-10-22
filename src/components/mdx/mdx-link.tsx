import Link from './link'

const openAllExternalLinksInNewTab = true

function MarkdownLink({
  target,
  href = '',
  ...restProps
}: React.ComponentPropsWithoutRef<'a'>) {
  const isExternalLink = href.startsWith('https')
  const linkTarget
    = isExternalLink && openAllExternalLinksInNewTab
      ? '_blank'
      : target

  return (
    <Link href={href} showIcon target={linkTarget} {...restProps} />
  )
}

export default MarkdownLink
