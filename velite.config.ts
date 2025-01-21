import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import {
  transformerNotationDiff,
  transformerNotationFocus,
} from '@shikijs/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMathjax from 'rehype-mathjax'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import emoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { visit } from 'unist-util-visit'
import { defineCollection, defineConfig, defineSchema, s } from 'velite'

// Add last modified based on git timestamp
const execAsync = promisify(exec)

const timestamp = defineSchema(() =>
  s
    .custom<string | undefined>(i => i === undefined || typeof i === 'string')
    .transform<string>(async (value, { meta, addIssue }) => {
      if (value != null) {
        addIssue({ fatal: false, code: 'custom', message: '`s.timestamp()` schema will resolve the value from `git log -1 --format=%cd`' })
      }
      const { stdout } = await execAsync(`git log -1 --format=%cd ${meta.path}`)
      return new Date(stdout || Date.now()).toISOString()
    }),
)

const options: Partial<Options> = {
  theme: {
    dark: 'dark-plus',
    light: 'light-plus',
  },
  transformers: [
    transformerNotationDiff(),
    transformerNotationFocus(),
  ],
  keepBackground: false,
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0)
      node.children = [{ type: 'text', value: ' ' }]
  },
  onVisitHighlightedLine(node: any) {
    const nodeClass = node.properties.className

    if (nodeClass && nodeClass.length > 0)
      node.properties.className.push('line--highlighted')
    else node.properties.className = ['line--highlighted']
  },

  onVisitHighlightedChars(node: any, id) {
    node.properties.className = ['word--highlighted']
    if (id) {
      // If the word spans across syntax boundaries (e.g. punctuation), remove
      // colors from the child nodes.
      if (node.properties['data-rehype-pretty-code-wrapper']) {
        node.children.forEach(
          (childNode: { properties: { style: string } }) => {
            childNode.properties.style = ''
          },
        )
      }

      node.properties.style = ''
      node.properties['data-word-id'] = id
    }
  },
}

const meta = s
  .object({
    title: s.string().optional(),
    description: s.string().optional(),
    keywords: s.array(s.string()).optional(),
  })
  .default({})

const locale = s
  .object({
    code: s.string(),
    name: s.string(),
    path: s.string(),
    slug: s.string(),
  })

const cover = s
  .object({
    image: s.string(),
    author: s.string().default(''),
    creditLink: s.string().default(''),
    hostName: s.string().default(''),
  })

const series = s
  .object({
    title: s.string(),
    order: s.number(),
  })
  .optional()

function computedFields<T extends { slug: string }>(data: T) {
  return {
    ...data,
    slugAsParams: data.slug.split('/').slice(1).join('/'),
  }
}

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.path(),
      date: s.isodate(),
      lastModified: timestamp(),
      excerpt: s.excerpt(),
      tags: s.array(s.string()).default([]),
      categories: s.array(s.string()).default([]),
      language: s.string(),
      otherLanguages: s.array(locale),
      hasSeries: s.boolean().default(false),
      series,
      cover,
      body: s.mdx(),
      toc: s.toc(),
      meta,
      metadata: s.metadata(),
      published: s.boolean().default(true),
    })
    .transform(computedFields),
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      language: s.string(),
      cover,
      description: s.string(),
      date: s.isodate(),
      client: s.string(),
      industry: s.string(),
      url: s.string(),
      type: s.string(),
      license: s.string(),
      technologies: s.array(s.string()).default([]),
      body: s.mdx(),
      published: s.boolean().default(true),
    })
    .transform(computedFields),

})

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [
      rehypeStringify,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children

            if (codeEl.tagName !== 'code')
              return

            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/
              const match = codeEl.data?.meta.match(regex)

              if (match) {
                node.__event__ = match ? match[1] : null
                codeEl.data.meta = codeEl.data.meta.replace(regex, '')
              }
            }

            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
            node.__style__ = node.properties?.__style__
          }
        })
      },
      [rehypePrettyCode, options],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties))
              return

            const preElement = node.children.at(-1)

            if (preElement.tagName !== 'pre')
              return

            preElement.properties.__rawString__ = node.__rawString__
          }
        })
      },
      rehypeSlug,
      rehypeMathjax,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['anchor-link'],
            ariaLabel: 'Link to section',
          },
        },
      ],
      rehypeUnwrapImages,
    ],
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      [emoji, {
        accessible: true,
        emoticon: true,
      }],
    ],
  },
})
