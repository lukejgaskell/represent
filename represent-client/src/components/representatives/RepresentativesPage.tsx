import { DefaultLayout } from 'components/layouts/DefaultLayout'
import React, { useState } from 'react'
import supabase from 'lib/supabaseClient'
import useSWR from 'swr'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

async function fetcher(key: string, page: number) {
	const start = (page - 1) * 25
	const end = page * 25

	const { data, error } = await supabase
		.from('members')
		.select(
			`id, metadata->first_name, metadata->last_name, metadata->title, metadata->party, metadata->votes_with_party_pct, metadata->missed_votes_pct`
		)
		.range(start, end)
		.order('metadata->last_name')
	if (error) throw error

	return data
}
export const RepresentativesPage = () => {
	const [page, setPage] = useState(1)
	const { data, error } = useSWR(['members', page], fetcher)

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

				{!data && <h2>Loading...</h2>}
				{data && (
					<Grid container direction='column' spacing={2}>
						{data.map((r: any) => (
							<Grid item key={r.id}>
								<Card>
									<CardContent className={partyToColor(r.party)}>
										<Grid container justifyContent='space-between'>
											<Grid item>
												<Typography>{`${r.first_name} ${r.last_name}`}</Typography>
											</Grid>
											<Grid item>
												<Typography color='textSecondary'>{r.title}</Typography>
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
				)}
			</section>
		</DefaultLayout>
	)
}
