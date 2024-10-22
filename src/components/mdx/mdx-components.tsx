import dynamic from 'next/dynamic'
import * as runtime from 'react/jsx-runtime'
import Blockquote from './blockquote'
import DangerCallout from './danger-callout'
import InfoCallout from './info-callout'
import MarkdownCodeTitles from './mdx-code-titles'
import MarkdownImage from './mdx-image'
import MarkdownLink from './mdx-link'
import MarkdownPreCode from './mdx-pre-code'
import MarkdownTable from './mdx-table'
import SuccessCallout from './success-callout'
import WarningCallout from './warning-callout'

const Mermaid = dynamic(() => import('./mermaid'), {
  ssr: false,
})

const sharedComponents = {
  img: MarkdownImage,
  a: MarkdownLink,
  div: MarkdownCodeTitles as any,
  pre: MarkdownPreCode,
  table: MarkdownTable,
  InfoCallout,
  WarningCallout,
  SuccessCallout,
  DangerCallout,
  Mermaid,
  Blockquote,
}

// parse the Velite generated MDX code into a React component function
function useMDXComponent(code: string) {
  // eslint-disable-next-line no-new-func
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MdxProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export function MDXContent({ code, components }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={{ ...sharedComponents, ...components }} />
}
