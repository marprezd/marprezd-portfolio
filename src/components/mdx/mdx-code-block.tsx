'use client'

import type React from 'react'
import { cn } from '@/lib/utils'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { useId } from 'react'
import { ProgrammingLanguageIcon } from '../blog/programming-language-icon'
import { Button } from '../ui/button'

const queryClient = new QueryClient()

type MdxCodeBlockProps = {
  'data-filename'?: string
  'data-language'?: string
} & React.HTMLAttributes<HTMLDivElement>

function MdxCodeBlock(props: MdxCodeBlockProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CodeBlock {...props} />
    </QueryClientProvider>
  )
}

function CodeBlock({
  className,
  style,
  children,
  'data-filename': filename,
  ...restProps
}: MdxCodeBlockProps) {
  const codeId = useId()
  const copyMutation = useMutation({
    mutationKey: ['copy', codeId],
    mutationFn: async () => {
      const code = document.getElementById(codeId)?.textContent
      if (!code)
        return
      await navigator.clipboard.writeText(code)
      await new Promise(resolve => setTimeout(resolve, 2000))
    },
  })

  const handlecopyClick = (): void => {
    copyMutation.mutate()
  }

  const language = filename?.substring(filename.lastIndexOf('.') + 1)
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full">
        <div className="relative rounded-sm shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]" {...restProps}>
          {filename
            ? (
                <div className="relative flex items-center justify-between rounded-t-sm border-x-2 border-t border-border p-2 text-muted-foreground">
                  <div className="flex items-center gap-x-1.5 rounded-sm bg-cyan-100 px-3 py-1.5 font-mono text-xs font-medium text-cyan-800 dark:bg-cyan-800/30 dark:text-cyan-500">
                    <ProgrammingLanguageIcon language={language!} />
                    <span>{filename}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="copy code"
                    onClick={handlecopyClick}
                    disabled={copyMutation.isPending}
                  >
                    {copyMutation.isPending ? <IconCheck /> : <IconCopy />}
                  </Button>
                </div>
              )
            : undefined}
          <div className="relative">
            <pre
              id={codeId}
              className={cn(
                'group relative mt-0 flex overflow-auto rounded-sm border border-border font-mono font-normal text-sm leading-relaxed [&_code]:bg-transparent',

                filename ? 'rounded-t-none' : '',
                'shiki',
                className,
              )}
            >
              {children}

              {!filename
                ? (
                    <div className="absolute right-0 top-0 z-10 hidden p-2 text-muted-foreground group-hover:block">
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="copy code"
                        onClick={handlecopyClick}
                        disabled={copyMutation.isPending}
                      >
                        {copyMutation.isPending ? <IconCheck /> : <IconCopy />}
                      </Button>
                    </div>
                  )
                : undefined}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MdxCodeBlock
