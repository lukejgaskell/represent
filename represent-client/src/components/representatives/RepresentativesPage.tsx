import { DefaultLayout } from 'components/layouts/DefaultLayout'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import { Member } from './Member.type'
import { usePaginatedData } from 'lib/usePaginatedData'
export const RepresentativesPage = () => {
	const { data, error, hasMore, page, setPage } = usePaginatedData<Member>(
		'members',
		`id, metadata->first_name, metadata->last_name, metadata->title, metadata->party, metadata->votes_with_party_pct, metadata->missed_votes_pct, metadata->state`,
		'metadata->last_name',
		15
	)

	function partyToColor(party: string) {
		switch ((party || '').toUpperCase()) {
			case 'D':
				return 'bg-blue-400'
			case 'R':
				return 'bg-red-400'
		}
		return ''
	}

	return (
		<DefaultLayout>
			<section>
				<h2 className='text-xl font-semibold mb-3'>Representatives</h2>
				<InfiniteScroll
					className='pr-3 pl-3'
					dataLength={data?.length || 0} //This is important field to render the next data
					next={() => setPage(page + 1)}
					hasMore={hasMore}
					loader={<h2 className='pt-2'>Loading...</h2>}
					// below props only if you need pull down functionality
					refreshFunction={() => setPage(1)}
					endMessage={<h2>no more items</h2>}
					pullDownToRefresh
					pullDownToRefreshThreshold={50}
					pullDownToRefreshContent={
						<h3 style={{ textAlign: 'center' }}>
							&#8595; Pull down to refresh
						</h3>
					}
					releaseToRefreshContent={
						<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
					}
				>
					<Grid container direction='column' spacing={2}>
						{data?.map((r: any) => (
							<Grid item key={r.id}>
								<Card>
									<CardContent className={partyToColor(r.party)}>
										<Grid
											container
											justifyContent='space-between'
											className='mb-3'
										>
											<Grid item>
												<Typography>{`${r.first_name} ${r.last_name}`}</Typography>
											</Grid>
											<Grid item>
												<Typography color='textSecondary'>{`${r.state} | ${r.title}`}</Typography>
											</Grid>
										</Grid>
										<Grid container justifyContent='space-between'>
											<Grid item>
												<Typography variant='body2' component='p'>
													{'With Party % : ' + r.votes_with_party_pct}
												</Typography>
											</Grid>
											<Grid item>
												<Typography variant='body2' component='p'>
													{'Missed Votes %: ' + r.missed_votes_pct}
												</Typography>
											</Grid>
										</Grid>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</InfiniteScroll>
			</section>
		</DefaultLayout>
	)
}
