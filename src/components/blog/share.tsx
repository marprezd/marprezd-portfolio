'use client'

import { host } from '@/config'
import useDeviceDetection from '@/hooks/useDeviceDetection'
import {
  IconBrandFacebook,
  IconBrandLine,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandWhatsapp,
  IconBrandX,
} from '@tabler/icons-react'
import { Button } from '../ui/button'

interface ShareProps {
  title: string
  description?: string
  locale: string
  slug: string
  hashtag: string[]
}

function Share({
  title,
  description,
  locale,
  slug,
  hashtag,
}: ShareProps) {
  const device = useDeviceDetection()

  const tags = hashtag.map((tag) => {
    return tag
  })

  return (
    <div className="mt-2 flex flex-row flex-wrap gap-2.5">
      <Button
        aria-label="Share on Facebook"
        size="icon"
        variant="ghost"
        asChild
      >
        <a href={`https://facebook.com/sharer/sharer.php?hashtags=${tags.join(',')}&url=${host}/${locale}/${slug}`}>
          <IconBrandFacebook />
        </a>
      </Button>
      <Button
        aria-label="Share on Facebook"
        size="icon"
        variant="ghost"
        asChild
      >
        <a href={`https://twitter.com/intent/tweet/?text=${title}&hashtags=${tags.join(',')}&via="marprezd"&url=${host}/${locale}/${slug}`}>
          <IconBrandX />
        </a>
      </Button>
      <Button
        aria-label="Share on Facebook"
        size="icon"
        variant="ghost"
        asChild
      >
        <a href={`https://www.reddit.com/submit?title=${title}&url=${host}/${locale}/${slug}`}>
          <IconBrandReddit />
        </a>
      </Button>
      <Button
        aria-label="Share on Facebook"
        size="icon"
        variant="ghost"
        asChild
      >
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${host}/${locale}/${slug}&title=${title}&summary=${description}&source=${host}"`}>
          <IconBrandLinkedin />
        </a>
      </Button>
      <Button
        aria-label="Share on Facebook"
        size="icon"
        variant="ghost"
        asChild
      >
        <a href={`https://social-plugins.line.me/lineit/share?url=${host}/${locale}/${slug}&title=${title}`}>
          <IconBrandLine />
        </a>
      </Button>
      <Button
        aria-label="Share on Facebook"
        size="icon"
        variant="ghost"
        asChild
      >
        <a href={`https://${device !== 'Desktop' ? 'api' : 'web'}.whatsapp.com/send?title=${title}&' :: '&url=${host}/${locale}/${slug}`}>
          <IconBrandWhatsapp />
        </a>
      </Button>
    </div>
  )
}

export default Share
