import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '@/modules/meta'
import '@/styles/globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/queryClient'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				<Meta />
				<Component {...pageProps} />
			</QueryClientProvider>
		</ThemeProvider>
	)
}

export default App
