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
				}
			}
		}`,
		fetcher
	)

	return (
		<Page>
			<section className='mt-20'>
				<h2 className='text-xl font-semibold'>Story</h2>

				{!data && <h2>Loading...</h2>}
				{data && data.items.map((v: any) => <h2>{v.description}</h2>)}
			</section>
		</Page>
	)
}

export default Votes
