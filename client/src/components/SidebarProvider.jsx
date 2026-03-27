import { createContext, useContext, useEffect, useState } from "react"

const initialState = {
  sidebar: false,
  setSidebar: () => false
}

const SidebarProviderContext = createContext(initialState)

export function SidebarProvider({
  children,
  defaultSidebar = false,
  storageKey = "vite-ui-sidebar",
  ...props
}) {
  const [sidebar, setSidebar] = useState(
    () => localStorage.getItem(storageKey) || defaultSidebar
  )

  useEffect(() => {
    const bar = document.getElementById('sidebar')

      return bar
    
  }, [sidebar])

  const value = {
    sidebar,
    setSidebar: sidebar => {
      localStorage.setItem(storageKey, sidebar)
      setSidebar(sidebar)
    }
  }

  return (
    <SidebarProvider.Provider {...props} value={value}>
      {children}
    </SidebarProvider.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const context = useContext(SidebarProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
