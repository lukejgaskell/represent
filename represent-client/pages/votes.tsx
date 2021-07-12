import Page from '@/components/page'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import supabase from '@/services/supabase.service'

const Votes = () => {
	const [page, setPage] = useState(1)
	const [votes, setVotes] = useState<any | null>(null)

	async function loadVotes() {
		const start = (page - 1) * 25
		const end = page * 25

		const { data } = await supabase
			.from('votes')
			.select(`metadata->description, metadata->question`)
			.range(start, end)

		setVotes(data)
	}
	useEffect(() => {
		loadVotes()
	}, [])

	return (
		<Page>
			<section>
				<h2 className='text-xl font-semibold'>Votes</h2>

				{!votes && <h2>Loading...</h2>}
				{votes && (
					<ul className='p-10'>
						{votes.map((v: any, index: number) => (
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

// export async function getServerSideProps({ req }: { req: any }) {
// 	const { user } = await supabase.auth.api.getUserByCookie(req)

// 	if (!user) {
// 		// If no user, redirect to index.
// 		return { props: {}, redirect: { destination: '/login', permanent: false } }
// 	}

// 	// If there is a user, return it.
// 	return { props: { user } }
// }

export default Votes
