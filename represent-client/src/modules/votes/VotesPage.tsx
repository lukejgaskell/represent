import { DefaultLayout } from '@/modules/layouts/DefaultLayout'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid } from '@material-ui/core'
import { Vote } from './Vote.type'
import { VoteCard } from 'ui/votes/VoteCard'
import { useInfiniteQuery } from 'react-query'
import { getVotes } from '@/queries/votes'
import { useUserStore } from '@/stores/useUserStore'
import { Paginated } from '@/types/Paginated'

export const VotesPage = () => {
	const { settings } = useUserStore()
	const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
		Paginated<Vote>,
		Error
	>(
		['votes', { state: settings.state, district: settings.district }],
		({ pageParam = 0 }) =>
			getVotes({
				page: pageParam,
				district: settings.district,
				state: settings.state,
			}),
		{
			keepPreviousData: true,
			getNextPageParam: (lastPage, pages) =>
				lastPage.hasMore ? lastPage.nextPage : undefined,
		}
	)

	return (
		<DefaultLayout title='Votes'>
			<section>
				<InfiniteScroll
					className='pl-2 pr-2'
					dataLength={data?.pages?.length || 0} //This is important field to render the next data
					next={() => fetchNextPage()}
					hasMore={hasNextPage || false}
					loader={<h2 className='pt-2'>Loading...</h2>}
					endMessage={<h2 className='pt-2'>no more items</h2>}
				>
					<Grid container direction='column' spacing={2}>
						{data?.pages.map((page) =>
							page?.items?.map((v: Vote, index: number) => (
								<Grid item xs={12} key={index}>
									<VoteCard key={index} {...v} />
								</Grid>
							))
						)}
					</Grid>
				</InfiniteScroll>
			</section>
		</DefaultLayout>
	)
}
