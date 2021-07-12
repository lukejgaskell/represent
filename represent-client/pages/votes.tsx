import Page from '@/components/page'
import useSWR from 'swr'
import { useState } from 'react'
import supabase from '@/services/supabase.service'

const fetcher = async ([page]: [number]) => {
	const start = (page - 1) * 25
	const end = page * 25
	const { data, error } = await supabase
		.from('votes')
		.select(`description question`)
		.range(start, end)

	if (error) {
		throw error
	}

	return data
}

const Votes = () => {
	const [page, setPage] = useState(1)
	const { data, error } = useSWR([page], fetcher)

	return (
		<Page>
			<section>
				<h2 className='text-xl font-semibold'>Votes</h2>

				{!data && <h2>Loading...</h2>}
				{data && (
					<ul className='p-10'>
						{data.map((v: any, index: number) => (
							<div
								key={index}
								className='w-full lg:max-w-full lg:flex mt-2 mb-2'
							>
								<div className='w-full border border-gray-400 rounded-b p-4 flex flex-col justify-between leading-normal'>
									<h2 className='text-base'>{v.description || v.question}</h2>
								</div>
							</div>
						))}
					</ul>
				)}
			</section>
		</Page>
	)
}

export async function getServerSideProps({ req }: { req: any }) {
	const { user } = await supabase.auth.api.getUserByCookie(req)

	if (!user) {
		// If no user, redirect to index.
		return { props: {}, redirect: { destination: '/login', permanent: false } }
	}

	// If there is a user, return it.
	return { props: { user } }
}

export default Votes
