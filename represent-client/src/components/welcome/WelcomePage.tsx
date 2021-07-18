import { DefaultLayout } from 'components/layouts/DefaultLayout'

export const WelcomePage = () => (
	<DefaultLayout title='Welcome'>
		<section className='mt-15'>
			<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
				Welcome to Represent
			</h2>

			<p className='mt-2 text-gray-600 dark:text-gray-400'>
				We aim to give you upfront information about what your elected officials
				are doing on your behalf. Represent presents information arounds
				what&apos;s happening in the house and senate.
			</p>

			<h2 className='text-l font-semibold text-gray-800 dark:text-gray-200'>
				Getting Started
			</h2>

			<p className='mt-2 text-gray-600 dark:text-gray-400'>
				1. You can keep up with what votes have recently been voted on in
				Congress by clicking on the votes tab.
			</p>
			<p className='mt-2 text-gray-600 dark:text-gray-400'>
				2. Take a look at the representatives tab where you can see who your
				reprenatives are and how they've been voting. You can also find useful
				links to get more information about what they are doing.
			</p>
		</section>
	</DefaultLayout>
)
