import type { Config } from 'tailwindcss'
import { divider, nextui } from '@nextui-org/theme'
import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/avatar.js',
    './node_modules/@nextui-org/theme/dist/components/card.js',
    './node_modules/@nextui-org/theme/dist/components/dropdown.js',
    './node_modules/@nextui-org/theme/dist/components/input.js',
    './node_modules/@nextui-org/theme/dist/components/kbd.js',
    './node_modules/@nextui-org/theme/dist/components/link.js',
    './node_modules/@nextui-org/theme/dist/components/navbar.js',
    './node_modules/@nextui-org/theme/dist/components/popover.js',
    './node_modules/@nextui-org/theme/dist/components/scroll-shadow.js',
    './node_modules/@nextui-org/theme/dist/components/switch.js',
    './node_modules/@nextui-org/theme/dist/components/tooltip.js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        'DEFAULT': '1rem',
        'sm': '2rem',
        'lg': '4rem',
        'xl': '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        gray: colors.neutral,
        palettes: {
          primary: {
            0: '#000000',
            5: '#001418',
            10: '#001F25',
            15: '#002A31',
            20: '#00363E',
            25: '#00424C',
            30: '#004E5A',
            35: '#005B68',
            40: '#006877',
            50: '#008395',
            60: '#259EB2',
            70: '#4BB9CD',
            80: '#6BD5EA',
            90: '#A2EEFF',
            95: '#D4F7FF',
            98: '#EFFCFF',
            99: '#F7FDFF',
            100: '#FFFFFF',
          },
          secondary: {
            0: '#000000',
            5: '#2C000A',
            10: '#400013',
            15: '#53001B',
            20: '#670023',
            25: '#7B002C',
            30: '#910035',
            35: '#A6003E',
            40: '#BD0047',
            50: '#EB015B',
            60: '#FF4E78',
            70: '#FF869B',
            80: '#FFB2BC',
            90: '#FFD9DD',
            95: '#FFECED',
            98: '#FFF8F7',
            99: '#FFFBFF',
            100: '#FFFFFF',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [
    typography,
    nextui({
      prefix: 'nextui',
      defaultExtendTheme: 'light',
      themes: {
        light: {
          colors: {
            default: {
              50: '#ffffff',
              100: '#fafafa',
              200: '#f5f5f5',
              300: '#e5e5e5',
              400: '#d4d4d4',
              500: '#a3a3a3',
              600: '#737373',
              700: '#525252',
              800: '#404040',
              900: '#262626',
            },
            content1: '#ffffff',
            content2: '#fafafa',
            content3: '#f5f5f5',
            content4: '#e5e5e5',
            background: '#fafafa',
            foreground: '#0a0a0a',
            primary: {
              foreground: '#ffffff',
              DEFAULT: '#006877',
            },
            secondary: {
              foreground: '#ffffff',
              DEFAULT: '#bd0047',
            },
            divider: 'rgba(17, 17, 17, 0.15)',
            focus: '#006877',
          },
        },
        dark: {
          colors: {
            default: {
              50: '#262626',
              100: '#404040',
              200: '#525252',
              300: '#737373',
              400: '#a3a3a3',
              500: '#d4d4d4',
              600: '#e5e5e5',
              700: '#f5f5f5',
              800: '#fafafa',
              900: '#ffffff',
            },
            content1: '#262626',
            content2: '#404040',
            content3: '#525252',
            content4: '#737373',
            background: '#0a0a0a',
            foreground: '#fafafa',
            primary: {
              foreground: '#00363E',
              DEFAULT: '#83D2E3',
            },
            secondary: {
              foreground: '#400013',
              DEFAULT: '#ffb2bc',
            },
            divider: 'rgba(255, 255, 255, 0.15)',
            focus: '#00363E',
          },
        },
      },
    }),
  ],
}
export default config
