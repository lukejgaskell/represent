import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'
import supabase from 'services/supabase.service'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => {
	const user = supabase.auth.user()

	return (
		<>
			{title ? (
				<Head>
					<title>Represent | {title}</title>
				</Head>
			) : null}

			{user && <Appbar />}

			<main
				/**
				 * Padding top = `appbar` height
				 * Padding bottom = `bottom-nav` height
				 */
				className='mx-auto pt-20 pb-16 max-w-screen-md'
			>
				<div className='p-6'>{children}</div>
			</main>

			{user && <BottomNav />}
		</>
	)
}

export default Page
