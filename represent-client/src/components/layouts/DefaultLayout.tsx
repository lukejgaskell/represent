import BottomNav from '@/components/bottom-nav'
import { ErrorToast } from '../notifications/ErrorToast'
import Head from 'next/head'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import TopBar from '../top-bar/TopBar'
import { WaitForAuth } from '../auth/WaitForAuth'
import { WaitForSettings } from '../user/WaitForSettings'
import theme from 'lib/materialTheme'

interface Props {
	title: string
	children: React.ReactNode
}

export const DefaultLayout = ({ title, children }: Props) => {
	return (
		<ThemeProvider theme={theme}>
			<WaitForAuth>
				<WaitForSettings>
					{title ? (
						<Head>
							<title>Represent | {title}</title>
						</Head>
					) : null}

					<TopBar pageTitle={title} />
					<ErrorToast />

					<main className='mx-auto pb-16 max-w-screen-md mt-15'>
						<div className='pt-4 pr-1 pl-1 pb-4'>{children}</div>
					</main>

					<BottomNav />
				</WaitForSettings>
			</WaitForAuth>
		</ThemeProvider>
	)
}
