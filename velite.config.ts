import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import rehypeShiki from '@shikijs/rehype'
import {
  transformerNotationDiff,
  transformerNotationFocus,
} from '@shikijs/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMathjax from 'rehype-mathjax'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import emoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
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
      [
        rehypeShiki,
        {
          themes: {
            dark: 'dark-plus',
            light: 'light-plus',
          },
          skipInline: true,
          transformers: [
            transformerNotationDiff({
              matchAlgorithm: 'v3',
            }),
            transformerNotationFocus({
              matchAlgorithm: 'v3',
            }),
          ],
        },
      ],
      rehypeStringify,
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
