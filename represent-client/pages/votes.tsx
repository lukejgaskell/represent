import Page from '@/components/page'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { useState } from 'react'
import supabase from '@/services/supabase.service'

const fetcher = (query: any) =>
	request(
		'https://8kef7v7qlj.execute-api.us-east-1.amazonaws.com/dev/graphql',
		query
	)

const Votes = () => {
	const [page, setPage] = useState(1)
	const { data, error } = useSWR(
		`query {
			votes(page: ${page}, pageSize: 25) {
				count
				items {
					description
					question
				}
			}
		}`,
		fetcher
	)

	return (
		<Page>
			<section>
				<h2 className='text-xl font-semibold'>Votes</h2>

				{!data && <h2>Loading...</h2>}
				{data && (
					<ul className='p-10'>
						{data.votes.items.map((v: any, index: number) => (
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
