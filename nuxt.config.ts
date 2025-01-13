// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'unplugin-icons/nuxt',
  ],
  // Defaults options
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
  content: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'tr'],
    documentDriven: {
      injectPage: false, // turn off injectPage because we are using our own [...slug].vue
    },
    markdown: {
      remarkPlugins: {},
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: 'noopener noreferer',
          },
        ],
      ],
    },
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
      },
      langs: [
        'cpp',
        'java',
        'python',
        'bash',
        'javascript',
        'json',
        'js',
        'ts',
        'vue',
        'shell',
        'mdc',
        'md',
        'yaml',
      ],
    },
  },
  i18n: {
    baseUrl: 'https://marprezd.vercel.app',
    customRoutes: 'config',
    pages: {
      'blog': {
        es: '/blog',
        tr: '/blog',
      },
      'blog/[...slug]': {
        es: '/blog/[...slug]',
        tr: '/blog/[...slug]',
      },
      'projects': {
        es: '/proyectos',
        tr: '/projeler',
      },
      'courses': {
        es: '/cursos',
        tr: '/dersler',
      },
      'resources': {
        es: '/recursos',
        tr: '/kaynaklar',
      },
      'about': {
        es: '/acerca-de-mi',
        tr: '/benim-hakkimda',
      },
      'hire': {
        es: '/contratame',
        tr: '/beni-ise-al',
      },
      'guest-book': {
        es: '/libro-de-visitas',
        tr: '/misafir-defteri',
      },
    },
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        language: 'en',
        name: 'English',
        file: 'en.ts',
      },
      {
        code: 'es',
        language: 'es',
        name: 'Español',
        file: 'es.ts',
      },
      {
        code: 'tr',
        language: 'tr',
        name: 'Türkçe',
        file: 'tr.ts',
      },
    ],
    lazy: true,
    vueI18n: './i18n.config.ts',
    skipSettingLocaleOnNavigate: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference.
    fallback: 'light', // fallback value if not system preference found.
    classSuffix: '', // set the classSuffix option to an empty string to compatibility with Tailwindcss.
  },
  image: {
    quality: 80,
    domains: ['res.cloudinary.com'],
    format: ['avif', 'webp', 'jpeg', 'jpg', 'png'],
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dieoeaoiy/image/upload/',
    },
  },
  sitemap: {
    cacheMaxAgeSeconds: 3600, // 1 hour
    sitemaps: {
      pages: {
        include: [
          '/blog/**',
          'projects',
          'courses',
          'about',
          'hire',
        ],
      },
    },
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Hreflangs', select: 'count(xhtml)', width: '25%' },
    ],
  },
  googleFonts: {
    families: {
      'Inter': {
        wght: '100..900',
      },
      'JetBrains Mono': {
        wght: '400',
      },
    },
    display: 'swap',
    preload: true,
    outputDir: 'assets',
    fontsDir: 'fonts',
    fontsPath: '../fonts',
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
    },
  },
})
