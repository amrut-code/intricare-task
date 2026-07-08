import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  initTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light'
        set({ theme: nextTheme })
        
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(nextTheme)
      },
      initTheme: () => {
        const currentTheme = get().theme
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(currentTheme)
      }
    }),
    {
      name: 'intricare_theme'
    }
  )
)
