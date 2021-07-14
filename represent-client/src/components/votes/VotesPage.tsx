import { DefaultLayout } from 'components/layouts/DefaultLayout'
import useSWR from 'swr'
import React, { useState } from 'react'
import supabase from 'lib/supabaseClient'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

async function fetcher(key: string, page: number) {
	const start = (page - 1) * 25
	const end = page * 25

	const { data, error } = await supabase
		.from('votes')
		.select(
			`metadata->description, metadata->question, metadata->result, metadata->total, metadata->date`
		)
		.range(start, end)
	if (error) throw error

	return data
}
export const VotesPage = () => {
	const [page, setPage] = useState(1)
	const { data, error } = useSWR(['votes', page], fetcher)

	return (
		<DefaultLayout>
			<section>
				<h2 className='text-xl font-semibold mb-3'>Votes</h2>

				{!data && <h2>Loading...</h2>}
				{data && (
					<Grid container direction='column' spacing={2}>
						{data.map((v: any, index: number) => (
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
				)}
			</section>
		</DefaultLayout>
	)
}
