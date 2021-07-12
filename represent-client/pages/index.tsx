import Page from '@/components/page'
import supabase from 'services/supabase.service'

const Index = () => (
	<Page>
		<section className='mt-20'>
			<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
				Welcome to represent
			</h2>

			<p className='mt-2 text-gray-600 dark:text-gray-400'>
				We aim to give you upfront information about what your elected officials
				are doing on your behalf. Represent presents information arounds
				what&apos;s happening in the house and senate.
			</p>
		</section>
	</Page>
)

export async function getServerSideProps({ req }: { req: any }) {
	const { user } = await supabase.auth.api.getUserByCookie(req)

	if (!user) {
		// If no user, redirect to index.
		return { props: {}, redirect: { destination: '/login', permanent: false } }
	}

	// If there is a user, return it.
	return { props: { user } }
}

export default Index
