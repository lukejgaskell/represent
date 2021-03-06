import React, { useState } from 'react'

import { DefaultLayout } from '@/components/layouts/DefaultLayout'
import { Grid } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Paginated } from '@/types/Paginated'
import { Vote } from './types'
import { VoteCard } from '@/modules/activity/VoteCard'
import { getVotes } from '@/modules/activity/api'
import { useInfiniteQuery } from 'react-query'
import { useUserStore } from '@/stores/user/useUserStore'
import { useRouter } from 'next/router'
import { useNotificationStore } from '@/stores/notification/useNotificationStore'

export const ActivityPage = () => {
	const { settings } = useUserStore()
	const { notify } = useNotificationStore()
	const router = useRouter()
	const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
		Paginated<Vote>,
		Error
	>(
		['votes', { state: settings.state, district: settings.district }],
		({ pageParam = 0 }) =>
			getVotes({
				page: pageParam,
				district: settings.district || '',
				state: settings.state || '',
			}),
		{
			keepPreviousData: true,
			getNextPageParam: (lastPage, pages) =>
				lastPage.hasMore ? lastPage.nextPage : undefined,
		}
	)

	const items = data?.pages.reduce(
		(acc, page) => [...acc, ...page.items],
		[] as Vote[]
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
						{items?.map((v: Vote, index: number) => (
							<Grid
								item
								container
								xs={12}
								key={index}
								onClick={() => {
									if (!v.bill_id) {
										notify({
											type: 'info',
											message: 'Vote is not related to a bill',
										})
										return
									}
									router.push({
										pathname: '/activity/[id]',
										query: { id: v.id },
									})
								}}
							>
								<VoteCard key={index} {...v} />
							</Grid>
						))}
					</Grid>
				</InfiniteScroll>
			</section>
		</DefaultLayout>
	)
}
