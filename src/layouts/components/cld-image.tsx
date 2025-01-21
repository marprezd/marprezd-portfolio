'use client'

import type { CldImageProps } from 'next-cloudinary'
import { CldImage as CldImageDefault } from 'next-cloudinary'

function CldImage(props: CldImageProps) {
  return <CldImageDefault {...props} />
}

export default CldImage
