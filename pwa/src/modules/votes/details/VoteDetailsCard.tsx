import { getNumberOfDays } from '@/lib/dateUtils'
import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import { formatDistance } from 'date-fns'
import { VoteDetails } from './types'

type IProps = VoteDetails
export function VoteDetailsCard({
	result,
	description,
	total,
	date,
	chamber,
	question,
}: IProps) {
	const useRelative = getNumberOfDays(new Date(date), new Date()) < 4
	const dateDisp = useRelative
		? formatDistance(new Date(date), new Date(), {
				addSuffix: true,
		  })
		: new Date(date).toLocaleDateString().replaceAll('/', '-')

	return (
		<Card style={{ width: '100%' }}>
			<CardContent>
				<Grid container direction='column' spacing={1}>
					<Grid item container xs={12} alignItems='center' spacing={4}>
						<Grid
							item
							container
							direction='column'
							spacing={0}
							style={{ lineHeight: '12px' }}
							xs={6}
						>
							<Grid item>
								<Typography variant='caption' color='textSecondary'>
									{`${dateDisp}`}
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='caption' color='textSecondary'>
									{`${chamber}`}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h6'>{description}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider light />
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant='body2'
							color='textSecondary'
						>{`Voting ${question}`}</Typography>
					</Grid>
					<Grid
						item
						container
						xs={12}
						justifyContent='space-between'
						alignItems='center'
					>
						<Grid item>
							<Typography>{result}</Typography>
						</Grid>
						<Grid item>
							<Typography variant='caption' component='p' color='textSecondary'>
								{`${total.yes} Yes / ${
									total.not_voting + total.present
								} Abstain / ${total.no} No`}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Divider light />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
