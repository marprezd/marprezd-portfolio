'use client'

import useDeviceDetection from '@/hooks/useDeviceDetection'
import { server } from '@/lib/serverUrl'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import {
  IconBrandFacebook,
  IconBrandLine,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandWhatsapp,
  IconBrandX,
} from '@tabler/icons-react'

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
        isExternal
        isIconOnly
        aria-label="Share on Facebook"
        as={Link}
        color="default"
        href={`https://facebook.com/sharer/sharer.php?hashtags=${tags.join(',')}&url=${server}/${locale}/${slug}`}
        size="sm"
        variant="solid"
        radius="full"
      >
        <IconBrandFacebook size={18} />
      </Button>
      <Button
        isExternal
        isIconOnly
        aria-label="Share on Twitter"
        as={Link}
        color="default"
        href={`https://twitter.com/intent/tweet/?text=${title}&hashtags=${tags.join(',')}&via="marprezd"&url=${server}/${locale}/${slug}`}
        size="sm"
        variant="solid"
        radius="full"
      >
        <IconBrandX size={18} />
      </Button>
      <Button
        isExternal
        isIconOnly
        aria-label="Share on Reddit"
        as={Link}
        color="default"
        href={`https://www.reddit.com/submit?title=${title}&url=${server}/${locale}/${slug}`}
        size="sm"
        variant="solid"
        radius="full"
      >
        <IconBrandReddit size={18} />
      </Button>
      <Button
        isExternal
        isIconOnly
        aria-label="Share on Linkedin"
        as={Link}
        color="default"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${server}/${locale}/${slug}&title=${title}&summary=${description}&source=${server}"`}
        size="sm"
        variant="solid"
        radius="full"
      >
        <IconBrandLinkedin size={18} />
      </Button>
      <Button
        isExternal
        isIconOnly
        aria-label="Share on Line"
        as={Link}
        color="default"
        href={`https://social-plugins.line.me/lineit/share?url=${server}/${locale}/${slug}&title=${title}`}
        size="sm"
        variant="solid"
        radius="full"
      >
        <IconBrandLine size={18} />
      </Button>
      <Button
        isExternal
        isIconOnly
        aria-label="Share on Whatsapp"
        as={Link}
        color="default"
        href={`https://${device !== 'Desktop' ? 'api' : 'web'}.whatsapp.com/send?title=${title}&' :: '&url=${server}/${locale}/${slug}`}
        size="sm"
        variant="solid"
        radius="full"
      >
        <IconBrandWhatsapp size={18} />
      </Button>
    </div>
  )
}

export default Share
