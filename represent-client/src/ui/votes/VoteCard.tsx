import { MemberVote, Vote } from '@/modules/votes/Vote.type'
import {
	Card,
	CardContent,
	Divider,
	Grid,
	Icon,
	Typography,
} from '@material-ui/core'
import React from 'react'
import { formatDistance } from 'date-fns'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import GavelIcon from '@material-ui/icons/Gavel'

type IProps = Vote

function MemberDisplay({ name, vote_position }: MemberVote) {
	let VotePositionIcon, color
	switch (vote_position.toLowerCase()) {
		case 'yes':
			VotePositionIcon = CheckCircleOutlinedIcon
			color = 'green'
			break
		case 'no':
			VotePositionIcon = NotInterestedIcon
			color = 'red'
			break
		default:
			VotePositionIcon = RemoveCircleOutlineIcon
			color = 'grey'
			break
	}

	return (
		<Grid item>
			<Grid container alignItems='center' direction='row' spacing={1}>
				<Grid item>
					<Typography variant='caption'>{'answer'}</Typography>
					{/* <Typography variant='caption'>{name}</Typography><VotePositionIcon fontSize='small' style={{ color }} /> */}
				</Grid>
				<Grid item>
					<Typography variant='caption'>{name}</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}

export function VoteCard({
	bill_id,
	result,
	description,
	total,
	date,
	chamber,
	question,
	memberVotes,
}: IProps) {
	const dateDisp = formatDistance(new Date(date), new Date(), {
		addSuffix: true,
	})
	return (
		<Grid item>
			<Card>
				<CardContent>
					<Grid container direction='column' spacing={1}>
						<Grid item>
							<Grid container alignItems='center' spacing={1}>
								<Grid item>
									<GavelIcon />
								</Grid>
								<Grid item>
									<Grid
										container
										direction='column'
										spacing={0}
										style={{ lineHeight: '12px' }}
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
							</Grid>
						</Grid>
						<Grid item>
							<Typography>{description}</Typography>
						</Grid>
						<Grid item>
							<Divider light />
						</Grid>
						<Grid item>
							<Grid
								container
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography
									variant='body2'
									color='textSecondary'
								>{`Voting ${question}`}</Typography>
								<Grid item>
									<Typography
										variant='caption'
										component='p'
										color='textSecondary'
									>
										{`${total.yes} Yes / ${
											total.not_voting + total.present
										} Abstain / ${total.no} No`}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Typography>{result}</Typography>
						</Grid>
						<Grid item>
							<Divider light />
						</Grid>
						<Grid item>
							<Grid container spacing={2}>
								{memberVotes.map((mv, index) => (
									<MemberDisplay key={index} {...mv} />
								))}
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	)
}
