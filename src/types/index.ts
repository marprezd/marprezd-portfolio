import type { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export interface Books {
  title: string
  link: {
    href: string
    label: string
  }
  image: {
    src: string
    alt: string
  }
  summary: string
  description: string
  category: string
  authors: string
}
