import type { ReactNode } from 'react'
import './globals.css'

interface Props {
  children: ReactNode
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout({ children }: Props) {
  return children
}
