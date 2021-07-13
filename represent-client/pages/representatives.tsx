import Page from '@/components/page'
import { useEffect, useState } from 'react'
import supabase from '@/services/supabase.service'
import useSWR from 'swr'
async function fetcher(key: string, page: number) {
	const start = (page - 1) * 25
	const end = page * 25

	const { data, error } = await supabase
		.from('members')
		.select(`metadata->first_name, metadata->last_name`)
		.range(start, end)
	if (error) throw error

	return data
}
const Representatives = () => {
	const [page, setPage] = useState(1)
	const { data, error } = useSWR(['members', page], fetcher)

	return (
		<Page>
			<section>
				<h2 className='text-xl font-semibold'>Representatives</h2>

				{!data && <h2>Loading...</h2>}
				{data && (
					<ul className='p-10'>
						{data.map((r: any, index: number) => (
							<div
								key={index}
								className='w-full lg:max-w-full lg:flex mt-2 mb-2'
							>
								<div className='w-full border border-gray-400 rounded-b p-4 flex flex-col justify-between leading-normal'>
									<h2 className='text-base'>
										{r.first_name + ' ' + r.last_name}
									</h2>
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
