import Head from 'next/head'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import theme from 'lib/materialTheme'
import { WaitForAuth } from '../auth/WaitForAuth'
import { ErrorToast } from '../notifications/ErrorToast'

interface Props {
	title?: string
	children: React.ReactNode
}

export const FocusedLayout = ({ title, children }: Props) => {
	return (
		<ThemeProvider theme={theme}>
			<WaitForAuth>
				{title ? (
					<Head>
						<title>Represent | {title}</title>
					</Head>
				) : null}
				<ErrorToast />

				<main
					/**
					 * Padding top = `appbar` height
					 * Padding bottom = `bottom-nav` height
					 */
					className='mx-auto pt-20 pb-16 max-w-screen-md'
				>
					<div className='p-6'>{children}</div>
				</main>
			</WaitForAuth>
		</ThemeProvider>
	)
}
