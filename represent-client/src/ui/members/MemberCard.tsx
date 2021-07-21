import { Member } from '@/modules/representatives/Member.type'
import {
	Button,
	Card,
	CardContent,
	createStyles,
	Grid,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core'
import React from 'react'

type IProps = Member

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		youtube_button: {
			color: 'white',
			backgroundColor: '#B91C1C',
		},
		facebook_button: {
			color: 'white',
			backgroundColor: '#1877F2',
		},
		twitter_button: {
			color: 'white',
			backgroundColor: '#1DA1F2',
		},
		contact_button: {
			color: 'white',
			backgroundColor: '#047857',
		},
	})
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

export function MemberCard({
	party,
	first_name,
	last_name,
	title,
	votes_with_party_pct,
	missed_votes_pct,
	state,
	twitter_account,
	youtube_account,
	facebook_account,
	contact_form,
	next_election,
}: IProps) {
	const classes = useStyles()

	return (
		<Grid item>
			<Card>
				<CardContent className={partyToColor(party)}>
					<Grid container spacing={2} direction='column'>
						<Grid item>
							<Grid container justifyContent='space-between' className='mb-3'>
								<Grid item>
									<Typography>{`${first_name} ${last_name}`}</Typography>
								</Grid>
								<Grid item>
									<Typography color='textSecondary'>{`${state} | ${title}`}</Typography>
								</Grid>
							</Grid>
							<Grid container justifyContent='space-between'>
								<Grid item>
									<Typography variant='body2' component='p'>
										{`With Party % : ${votes_with_party_pct}`}
									</Typography>
									<Typography variant='body2' component='p'>
										{`Missed Votes %: ${missed_votes_pct}`}
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant='body2' component='p'>
										{`Next Election: ${next_election}`}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container spacing={1}>
								{facebook_account && (
									<Grid item xs={6}>
										<a
											href={`https://www.facebook.com/${facebook_account}`}
											target='_blank'
										>
											<Button
												fullWidth
												variant='contained'
												className={classes.facebook_button}
											>
												Facebook
											</Button>
										</a>
									</Grid>
								)}
								{twitter_account && (
									<Grid item xs={6}>
										<a
											href={`https://www.twitter.com/${twitter_account}`}
											target='_blank'
											rel='noopener noreferrer nofollow'
										>
											<Button
												fullWidth
												variant='contained'
												className={classes.twitter_button}
											>
												Twitter
											</Button>
										</a>
									</Grid>
								)}
								{youtube_account && (
									<Grid item xs={6}>
										<a
											href={`https://www.youtube.com/${youtube_account}`}
											target='_blank'
											rel='noopener noreferrer nofollow'
										>
											<Button
												fullWidth
												variant='contained'
												className={classes.youtube_button}
											>
												Youtube
											</Button>
										</a>
									</Grid>
								)}
								{contact_form && (
									<Grid item xs={6}>
										<a
											href={`${contact_form}`}
											target='_blank'
											rel='noopener noreferrer nofollow'
										>
											<Button
												fullWidth
												variant='contained'
												className={classes.contact_button}
											>
												Contact
											</Button>
										</a>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	)
}
