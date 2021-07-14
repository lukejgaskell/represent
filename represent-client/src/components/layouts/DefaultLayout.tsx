import Head from 'next/head'
import Appbar from 'components/appbar'
import BottomNav from 'components/bottom-nav'
import { WaitForAuth } from '../auth/WaitForAuth'

interface Props {
	title?: string
	children: React.ReactNode
}

export const DefaultLayout = ({ title, children }: Props) => {
	return (
		<WaitForAuth>
			{title ? (
				<Head>
					<title>Represent | {title}</title>
				</Head>
			) : null}

			<Appbar />

			<main
				/**
				 * Padding top = `appbar` height
				 * Padding bottom = `bottom-nav` height
				 */
				className='mx-auto pb-16 max-w-screen-md'
			>
				<div className='p-6'>{children}</div>
			</main>

			<BottomNav />
		</WaitForAuth>
	)
}
