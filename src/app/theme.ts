'use client'

import { cyan, red } from '@mui/material/colors'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// Create a theme instance.
const theme = responsiveFontSizes(createTheme({
  cssVariables: true,
  colorSchemes: {
    light: true,
    dark: true,
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
  palette: {
    primary: {
      main: cyan[700],
    },
    secondary: {
      main: red[700],
    },
  },
}))

export default theme
