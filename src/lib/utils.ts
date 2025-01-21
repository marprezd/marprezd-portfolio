import { type ClassValue, clsx } from 'clsx'
import { slug } from 'github-slugger'
import { marked } from 'marked'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// slugify
export function slugify(content: string) {
  return slug(content)
}

// markdownify
export function markdownify(content: string, div?: boolean) {
  const markdownContent: any = div
    ? marked.parse(content)
    : marked.parseInline(content)
  return { __html: markdownContent }
}

// humanize
export function humanize(content: string) {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => {
      return m.toUpperCase()
    })
}

// titleify
export function titleify(content: string) {
  const humanized = humanize(content)
  return humanized
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// plainify
export function plainify(content: string) {
  const parseMarkdown: any = marked.parse(content)
  const filterBrackets = parseMarkdown.replace(/<[^>]+(>|$)/gm, '')
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/g, '')
  const stripHTML = htmlEntityDecoder(filterSpaces)
  return stripHTML
}

// strip entities for plainify
function htmlEntityDecoder(htmlWithEntities: string): string {
  const entityList: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': '\'',
  }
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity]
    },
  )
  return htmlWithoutEntities
}
