import Head from 'next/head'

interface Props {
	title?: string
	children: React.ReactNode
}

export const NoAuthLayout = ({ title, children }: Props) => {
	return (
		<>
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
				<div className='p-6'>{children}</div>
			</main>
		</>
	)
}
