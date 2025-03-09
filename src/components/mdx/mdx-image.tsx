import type { ImageProps } from 'next/image'
import Image from 'next/image'

async function MarkdownImage({
  src,
  alt = '',
  ...restProps
}: ImageProps & { src: string }) {
  return (
    <figure className="mx-auto flex flex-col gap-2 text-center">
      <Image
        alt={alt}
        sizes="100vw"
        src={src}
        {...restProps}
      />
      {alt && <figcaption className="text-sm text-muted-foreground">{alt}</figcaption>}
    </figure>
  )
}

export default MarkdownImage
