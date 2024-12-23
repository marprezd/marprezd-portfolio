import type { Ref } from 'react'
import { IconArrowUpRight } from '@tabler/icons-react'
import NextLink from 'next/link'

type LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  showIcon?: boolean
}

function Link({ children, showIcon = false, href = '', ref, ...restProps }: LinkProps & { ref?: Ref<HTMLAnchorElement> }) {
  // TODO: use regex instead of `startWith`
  const isRouterLink = href.startsWith('/')
  const isExternalLink = href.startsWith('https') || href.startsWith('http')
  // const isAnchorLink = href.startsWith("#");
  const Link = isRouterLink ? NextLink : 'a'

  return (
    <Link
      href={href}
      {...(isExternalLink
        ? {
            ref,
            rel: 'noopener noreferrer nofollow',
          }
        : {})}
      {...restProps}
    >
      {children}
      {isExternalLink && showIcon && (
        <span className="inline-flex">
          <IconArrowUpRight className="size-4" />
        </span>
      )}
    </Link>
  )
}

export default Link
