import Page from '@/components/page'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { useState } from 'react'

const fetcher = (query: any) =>
	request(
		'https://8kef7v7qlj.execute-api.us-east-1.amazonaws.com/dev/graphql',
		query
	)

const Representatives = () => {
	const [page, setPage] = useState(0)
	const { data, error } = useSWR(
		`query {
			representatives(page: ${page}, pageSize: 15) {
				count
				items {
					name
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
						{data.representatives.items.map((r: any, index: number) => (
							<div
								key={index}
								className='w-full lg:max-w-full lg:flex mt-2 mb-2'
							>
								<div className='w-full border border-gray-400 rounded-b p-4 flex flex-col justify-between leading-normal'>
									<h2 className='text-base'>{r.name}</h2>
								</div>
							</div>
						))}
					</ul>
				)}
			</section>
		</Page>
	)
}

export default Representatives
