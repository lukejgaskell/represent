import { DefaultLayout } from 'components/layouts/DefaultLayout'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import { usePaginatedData } from 'lib/usePaginatedData'
import { Vote } from './Vote.type'

export const VotesPage = () => {
	const { data, error, hasMore, page, setPage } = usePaginatedData<Vote>(
		'votes',
		`metadata->description, metadata->question, metadata->result, metadata->total, metadata->date`,
		'metadata->date',
		15,
		false
	)

	return (
		<DefaultLayout>
			<section>
				<h2 className='text-xl font-semibold mb-3'>Votes</h2>
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
						{data?.map((v: any, index: number) => (
							<Grid item key={index}>
								<Card>
									<CardContent>
										<Grid
											container
											justifyContent='space-between'
											className='mb-3'
										>
											<Grid item>
												<Typography color='textSecondary'>
													{v.description}
												</Typography>
											</Grid>
											<Grid item>
												<Typography>{v.result}</Typography>
											</Grid>
										</Grid>
										<Grid container justifyContent='space-between'>
											<Grid item>
												<Typography variant='body2' component='p'>
													{`${v.total.yes} Yes / ${
														v.total.not_voting + v.total.present
													} Abstain / ${v.total.no} No`}
												</Typography>
											</Grid>
											<Grid item>
												<Typography variant='body2' component='p'>
													{v.date}
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
