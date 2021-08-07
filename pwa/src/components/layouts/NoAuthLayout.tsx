import Head from 'next/head'
import React from 'react'
import { WaitForNoAuth } from '../auth/WaitForNoAuth'
import { ThemeProvider } from '@material-ui/core'
import theme from 'lib/materialTheme'

interface Props {
	title?: string
	children: React.ReactNode
}

export const NoAuthLayout = ({ title, children }: Props) => {
	return (
		<ThemeProvider theme={theme}>
			<WaitForNoAuth>
				{title ? (
					<Head>
						<title>Represent | {title}</title>
					</Head>
				) : null}

				<main
					/**
					 * Padding top = `appbar` height
					 * Padding bottom = `bottom-nav` height
					 */
					className='mx-auto pt-20 pb-16 max-w-screen-md'
				>
					{children}
				</main>
			</WaitForNoAuth>
		</ThemeProvider>
	)
}
