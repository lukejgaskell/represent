import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'
import supabase from 'services/supabase.service'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
	title?: string
	children: React.ReactNode
	requiresAuth?: boolean
}

const Page = ({ title, children, requiresAuth = true }: Props) => {
	const user = supabase.auth.user()
	const router = useRouter()
	useEffect(() => {
		if (!user && requiresAuth) router.push('/login')
	}, [])

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
