import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import * as runtime from 'react/jsx-runtime'
import DangerCallout from './danger-callout'
import InfoCallout from './info-callout'
import MdxCodeBlock from './mdx-code-block'
import MarkdownImage from './mdx-image'
import { MdxInlineCode } from './mdx-inline-code'
import MarkdownLink from './mdx-link'
import SuccessCallout from './success-callout'
import WarningCallout from './warning-callout'

const sharedComponents = {
  img: MarkdownImage,
  a: MarkdownLink,
  InfoCallout,
  WarningCallout,
  SuccessCallout,
  DangerCallout,
  table: ({
    className,
    ...restProps
  }: React.HTMLAttributes<HTMLTableElement>) => (
    <Table className={cn(className, 'my-6')} {...restProps} />
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableHeader {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableBody {...props} />
  ),
  tfoot: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableFooter {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <TableRow {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <TableHead {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <TableCell {...props} />
  ),
  pre: ({ className, ...restProps }: React.HTMLAttributes<HTMLElement>) => (
    <MdxCodeBlock className={cn('mb-4', className)} {...restProps} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <MdxInlineCode {...props} />
  ),
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
