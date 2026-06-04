'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export const THEME_IDS = [
  'cyber-dark',
  'cyber-intel',
  'hacker',
  'luxury',
] as const

export type ThemeId = (typeof THEME_IDS)[number]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="cyber-dark"
      themes={[...THEME_IDS]}
      enableSystem={false}
      storageKey="portfolio-theme"
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
