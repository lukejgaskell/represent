import Head from 'next/head'
import BottomNav from '@/modules/bottom-nav'
import { WaitForAuth } from '../auth/WaitForAuth'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import theme from 'lib/materialTheme'
import TopBar from '../top-bar/TopBar'

interface Props {
	title: string
	children: React.ReactNode
}

export const DefaultLayout = ({ title, children }: Props) => {
	return (
		<ThemeProvider theme={theme}>
			<WaitForAuth>
				{title ? (
					<Head>
						<title>Represent | {title}</title>
					</Head>
				) : null}

				<TopBar pageTitle={title} />

				<main className='mx-auto pb-16 max-w-screen-md'>
					<div className='p-6'>{children}</div>
				</main>

				<BottomNav />
			</WaitForAuth>
		</ThemeProvider>
	)
}
