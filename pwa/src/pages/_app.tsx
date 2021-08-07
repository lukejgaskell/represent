import "@/styles/globals.css"

import type { AppProps } from "next/app"
import Meta from "@/components/meta"
import { QueryClientProvider } from "react-query"
import { ThemeProvider } from "next-themes"
import { queryClient } from "@/lib/queryClient"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <Meta />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
