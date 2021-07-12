import Page from '@/components/page'
import useSWR from 'swr'
import { request } from 'graphql-request'

const fetcher = (query: any) =>
	request(
		'https://8kef7v7qlj.execute-api.us-east-1.amazonaws.com/dev/graphql',
		query
	)

const Votes = () => {
	const year = new Date().getFullYear().toString()
	const month = new Date().getMonth().toString().padStart(2, '0')
	const { data, error } = useSWR(
		`query {
			votes(yearMonth: "${year}-${month}") {
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

export default Votes
