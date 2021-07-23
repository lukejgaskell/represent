import { DefaultLayout } from '@/modules/layouts/DefaultLayout'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid } from '@material-ui/core'
import { Member } from './Member.type'
import { useInfiniteQuery, useQuery } from 'react-query'
import { MemberCard } from '@/ui/members/MemberCard'
import { getMembers } from 'queries/members'
import { Paginated } from '@/types/Paginated'
import { getUserSettings } from '@/queries/user'
import { UserData } from '@/types/UserData'

export const RepresentativesPage = () => {
	const userQuery = useQuery<UserData | undefined>(['userSettings'], () =>
		getUserSettings()
	)
	const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
		Paginated<Member>,
		Error
	>(
		[`members`, userQuery.data?.state, userQuery.data?.district],
		({ pageParam = 0 }) =>
			getMembers({
				page: pageParam,
				state: userQuery.data?.state,
				district: userQuery.data?.district,
			}),
		{
			keepPreviousData: true,
			getNextPageParam: (lastPage, pages) =>
				lastPage.hasMore ? lastPage.nextPage : undefined,
			enabled: !userQuery.isLoading,
		}
	)

	return (
		<DefaultLayout title='Representatives'>
			<section>
				<Grid container direction='column' spacing={2}>
					<Grid item>
						<Grid
							container
							justifyContent='space-between'
							alignItems='flex-end'
						>
							<Grid item>
								<h2 className='text-xl font-semibold'>Representatives</h2>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<InfiniteScroll
							className='pr-2 pl-2'
							dataLength={data?.pages.length || 0} //This is important field to render the next data
							next={() => fetchNextPage()}
							hasMore={hasNextPage || false}
							loader={<h2 className='pt-2'>Loading...</h2>}
							endMessage={<h2>no more items</h2>}
						>
							<Grid container direction='column' spacing={2}>
								{data?.pages.map((page) =>
									page.items.map((r: Member) => (
										<MemberCard key={r.id} {...r} />
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
