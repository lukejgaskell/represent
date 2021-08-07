import {
	Card,
	CardContent,
	Divider,
	Grid,
	Icon,
	Typography,
} from '@material-ui/core'
import { MemberVote, Vote } from './types'

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'
import GavelIcon from '@material-ui/icons/Gavel'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import React from 'react'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import { displayDate } from '@/lib/dateUtils'

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
		<Grid
			item
			container
			key={name}
			xs={6}
			sm={3}
			alignItems='center'
			direction='row'
			spacing={1}
		>
			<Grid item xs={3} className='text-center'>
				<VotePositionIcon
					fontSize='small'
					style={{ color, marginBottom: '2px' }}
				/>
			</Grid>
			<Grid item xs={9}>
				<Typography variant='body2'>{name}</Typography>
			</Grid>
		</Grid>
	)
}

export function VoteCard({
	result,
	description,
	total,
	date,
	chamber,
	question,
	memberVotes,
	bill_id,
}: IProps) {
	return (
		<Card style={{ width: '100%' }}>
			<CardContent>
				<Grid container direction='column' spacing={1}>
					<Grid item container xs={12} spacing={0}>
						<Grid item xs={2}>
							<GavelIcon style={{ height: 40, width: 40 }} />
						</Grid>
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
									{`${displayDate(date)}`}
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='caption' color='textSecondary'>
									{`${chamber}`}
								</Typography>
							</Grid>
						</Grid>
						<Grid item style={{ lineHeight: '24px' }} xs={4}>
							<Typography variant='caption' color='textSecondary'>
								{bill_id && `Bill: ${bill_id}`}
							</Typography>
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
					<Grid item container xs={12} spacing={2}>
						{memberVotes.map((mv, index) => (
							<MemberDisplay key={index} {...mv} />
						))}
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
