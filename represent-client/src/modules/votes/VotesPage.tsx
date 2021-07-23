import { DefaultLayout } from '@/modules/layouts/DefaultLayout'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid } from '@material-ui/core'
import { Vote } from './Vote.type'
import { VoteCard } from 'ui/votes/VoteCard'
import { useInfiniteQuery } from 'react-query'
import { getVotes } from '@/queries/votes'
import { Paginated } from '@/types/Paginated'

export const VotesPage = () => {
	const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
		Paginated<Vote>,
		Error
	>(['votes'], ({ pageParam = 0 }) => getVotes({ page: pageParam }), {
		keepPreviousData: true,
		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? lastPage.nextPage : undefined,
	})

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
							dataLength={data?.pages?.length || 0} //This is important field to render the next data
							next={() => fetchNextPage()}
							hasMore={hasNextPage || false}
							loader={<h2 className='pt-2'>Loading...</h2>}
							endMessage={<h2>no more items</h2>}
						>
							<Grid container direction='column' spacing={2}>
								{data?.pages.map((page) =>
									page?.items?.map((v: Vote, index: number) => (
										<VoteCard key={index} {...v} />
									))
								)}
							</Grid>
						</InfiniteScroll>
					</Grid>
				</Grid>
			</section>
		</DefaultLayout>
	)
}
