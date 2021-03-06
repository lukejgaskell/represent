import { displayDate } from '@/lib/dateUtils'
import { Button, Divider, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { VoteDetails } from './types'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'

type IProps = VoteDetails

export function VoteDetailsCard({ bill_id, bill }: IProps) {
	const [showMore, setShowMore] = useState(false)

	if (!bill) {
		return <div>Bill was not found</div>
	}

	return (
		<Grid container direction='column' spacing={1} className='pr-4 pl-4'>
			<Grid item xs={12}>
				<Typography variant='h4'>Bill {bill_id}</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography color='textSecondary'>{bill.title}</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider light />
			</Grid>
			<Grid item container xs={12} spacing={1} direction='column'>
				<Grid item xs={12}>
					<Typography variant='h5'>Info</Typography>
				</Grid>
				{bill.primary_subject && (
					<Grid item xs={12}>
						<Typography color='textSecondary'>{`Is about ${bill.primary_subject}`}</Typography>
					</Grid>
				)}
				{bill.sponsor_name && (
					<Grid item xs={12}>
						<Typography color='textSecondary'>{`Sponsored by ${bill.sponsor_name}`}</Typography>
					</Grid>
				)}
				<Grid item xs={12}>
					<Typography color='textSecondary'>{`Introduced ${displayDate(
						bill.introduced_date
					)}`}</Typography>
				</Grid>
				{bill.vetoed && (
					<Grid item xs={12}>
						<Typography>This bill was vetoed</Typography>
					</Grid>
				)}
				<Grid item container xs={12}>
					<Grid item container xs={6}>
						<Grid item xs={2}>
							{bill.house_passage ? (
								<CheckCircleOutlinedIcon
									style={{ color: 'green', marginBottom: '2px' }}
								/>
							) : (
								<NotInterestedIcon
									style={{ color: 'grey', marginBottom: '2px' }}
								/>
							)}
						</Grid>
						<Grid item xs={6}>
							<Typography color='textSecondary'>House</Typography>
						</Grid>
					</Grid>
					<Grid item container xs={6}>
						<Grid item xs={2}>
							{bill.senate_passage ? (
								<CheckCircleOutlinedIcon
									style={{ color: 'green', marginBottom: '2px' }}
								/>
							) : (
								<NotInterestedIcon
									style={{ color: 'grey', marginBottom: '2px' }}
								/>
							)}
						</Grid>
						<Grid item xs={6}>
							<Typography color='textSecondary'>Senate</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider light />
			</Grid>
			<Grid item container xs={12} spacing={1}>
				<Grid item container justifyContent='space-between' xs={12} spacing={1}>
					<Grid item container xs={12} alignItems='center' spacing={3}>
						<Grid item xs={8}>
							<Typography variant='h5'>Latest Major Action</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography color='textSecondary'>
								{`(${displayDate(bill.latest_major_action_date)})`}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Typography color='textSecondary'>
							{bill.latest_major_action}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			{(bill.summary || bill.summary_short) && (
				<>
					<Grid item xs={12}>
						<Divider light />
					</Grid>
					<Grid item container xs={12} spacing={1} direction='column'>
						<Grid item xs={12}>
							<Typography variant='h5'>Summary</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography color='textSecondary'>
								{showMore ? bill.summary : bill.summary_short}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Button onClick={() => setShowMore(!showMore)} variant='outlined'>
								{showMore ? 'Show Less' : 'Show More'}
							</Button>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	)
}
