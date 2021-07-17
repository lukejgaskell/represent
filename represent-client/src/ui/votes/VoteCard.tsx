import { Vote } from '@/components/votes/Vote.type'
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'

type IProps = Vote

export function VoteCard({
	result,
	description,
	total,
	date,
	chamber,
	question,
}: IProps) {
	return (
		<Grid item>
			<Card>
				<CardContent>
					<Grid container direction='column' spacing={1}>
						<Grid item>
							<Grid container justifyContent='space-between' spacing={1}>
								<Grid item>
									<Typography variant='body2' color='textSecondary'>
										{`${date} | ${chamber} | ${result}`}
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant='body2' component='p'>
										{`${total.yes} Yes / ${
											total.not_voting + total.present
										} Abstain / ${total.no} No`}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Typography variant='body1'>{question}</Typography>
						</Grid>
						<Grid item>
							<Typography variant='body2'>{description}</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	)
}
