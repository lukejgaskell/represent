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
}: IProps) {
	const dateDisp = formatDistance(new Date(date), new Date(), {
		addSuffix: true,
	})
	return (
		<Card style={{ width: '100%' }}>
			<CardContent>
				<Grid container direction='column' spacing={1}>
					<Grid item container xs={12} alignItems='center' spacing={4}>
						<Grid item xs={1}>
							<GavelIcon />
						</Grid>
						<Grid
							item
							container
							direction='column'
							spacing={0}
							style={{ lineHeight: '12px' }}
							xs={4}
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
					<Grid
						item
						container
						xs={12}
						justifyContent='space-between'
						alignItems='center'
					>
						<Grid item>
							<Typography
								variant='body2'
								color='textSecondary'
							>{`Voting ${question}`}</Typography>
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
						<Typography>{result}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider light />
					</Grid>
					<Grid item container xs={12} spacing={2}>
						{memberVotes.map((mv) => (
							<MemberDisplay {...mv} />
						))}
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
