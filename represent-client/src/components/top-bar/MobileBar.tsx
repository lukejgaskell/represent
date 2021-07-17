import { isBrowser } from 'lib/isBrowser'

type IProps = { handleSignOut: () => void }

const MobileBar = ({ handleSignOut }: IProps) => {
	const pageTitle = isBrowser() ? document.title : ''

	return (
		<div className='pt-safe w-full bg-gray-900 fixed top-0'>
			<header className='bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800'>
				<div className='mx-auto px-6 max-w-screen-md h-10 flex items-center justify-between'></div>
			</header>
		</div>
	)
}

export default MobileBar
