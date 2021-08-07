import { displayDate } from '@/lib/dateUtils'
import { Button, Divider, Grid, Link, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { VoteDetails } from './types'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'

type IProps = VoteDetails

export function VoteDetailsCard({ bill_id, bill }: IProps) {
	const [showMore, setShowMore] = useState(false)

	const latestActions = bill.actions?.slice(0, 7) || []
	const latestVersions = bill.versions?.slice(0, 4) || []

	return (
		<Grid container direction='column' spacing={1} className='pr-4 pl-4'>
			<Grid item xs={12}>
				<Typography variant='h4'>Bill {bill_id}</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography>{bill.title}</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider light />
			</Grid>
			<Grid item container xs={12} spacing={1} direction='column'>
				<Grid item xs={12}>
					<Typography variant='h5'>Info</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography color='textSecondary'>{`subject: ${bill.primary_subject}`}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography color='textSecondary'>{`introduced ${displayDate(
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
			<Grid item container xs={12} spacing={1} direction='column'>
				<Grid item xs={12}>
					<Typography variant='h5'>Summary</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography>
						{showMore ? bill.summary : bill.summary_short}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Button onClick={() => setShowMore(!showMore)} variant='outlined'>
						{showMore ? 'Show Less' : 'Show More'}
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider light />
			</Grid>
			<Grid item container xs={12} spacing={1}>
				<Grid item>
					<Typography variant='h5'>Latest Versions</Typography>
				</Grid>
				{latestVersions.map((v, index) => (
					<Grid
						item
						container
						key={index}
						xs={12}
						spacing={1}
						alignItems='center'
					>
						<Grid item xs={8}>
							<Typography color='textSecondary'>{v.status}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Link href={v.url}>Go To Version</Link>
						</Grid>
						<Grid item xs={12}>
							{latestVersions.length - 1 > index && <Divider light />}
						</Grid>
					</Grid>
				))}
			</Grid>
			<Grid item xs={12}>
				<Divider light />
			</Grid>
			<Grid item container xs={12} spacing={1} direction='column'>
				<Grid item>
					<Typography variant='h5'>Latest Actions</Typography>
				</Grid>
				{latestActions.map((a, index) => (
					<Grid item container key={index} xs={12} spacing={1}>
						<Grid item container justifyContent='space-between' xs={12}>
							<Grid item xs={5}>
								<Typography color='textSecondary'>{a.action_type}</Typography>
							</Grid>
							<Grid item xs={4}>
								<Typography color='textSecondary'>{a.chamber}</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography color='textSecondary'>
									{displayDate(a.datetime)}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Typography>{a.description}</Typography>
						</Grid>
						<Grid item xs={12}>
							{latestActions.length - 1 > index && <Divider light />}
						</Grid>
					</Grid>
				))}
			</Grid>
		</Grid>
	)
}
