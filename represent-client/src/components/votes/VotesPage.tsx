import { DefaultLayout } from 'components/layouts/DefaultLayout'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid } from '@material-ui/core'
import { usePaginatedData } from 'lib/usePaginatedData'
import { Vote } from './Vote.type'
import { VoteCard } from 'ui/votes/VoteCard'
import supabase from 'lib/supabaseClient'

export const VotesPage = () => {
	const { data, error, hasMore, page, setPage } = usePaginatedData<Vote>(
		'votes',
		15,
		async (key: string, start: number, end: number) => {
			const { data, error } = await supabase
				.from<Vote>('votes')
				.select(
					`metadata->description, metadata->question, metadata->result, metadata->total, metadata->date, metadata->chamber, metadata->source`
				)
				.order(`metadata->date` as any, { ascending: false })
				.range(start, end)
			if (error) throw error

			return data
		}
	)

	return (
		<DefaultLayout title='Votes'>
			<section>
				<Grid container direction='column' spacing={2}>
					<Grid item>
						<h2 className='text-xl font-semibold mb-3'>Votes</h2>
					</Grid>
					<Grid item>
						<InfiniteScroll
							className='pr-3 pl-3'
							dataLength={data?.length || 0} //This is important field to render the next data
							next={() => setPage(page + 1)}
							hasMore={hasMore}
							loader={<h2 className='pt-2'>Loading...</h2>}
							endMessage={<h2>no more items</h2>}
						>
							<Grid container direction='column' spacing={2}>
								{data?.map((v: Vote, index: number) => (
									<VoteCard key={index} {...v} />
								))}
							</Grid>
						</InfiniteScroll>
					</Grid>
				</Grid>
			</section>
		</DefaultLayout>
	)
}
