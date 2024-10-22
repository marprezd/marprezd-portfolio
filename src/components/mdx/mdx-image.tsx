import type { ImageProps } from 'next/image'
import Image from './image'

async function MarkdownImage({
  src,
  alt = '',
  ...restProps
}: ImageProps & { src: string }) {
  return (
    <figure>
      <Image
        alt={alt}
        sizes="100vw"
        src={src}
        {...restProps}
      />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  )
}

export default MarkdownImage
