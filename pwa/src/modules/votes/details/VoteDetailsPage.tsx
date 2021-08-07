import React from 'react'

import { DefaultLayout } from '@/components/layouts/DefaultLayout'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { VoteDetails } from './types'
import { getVoteDetails } from './api'
import { Typography } from '@material-ui/core'
import { VoteDetailsCard } from './VoteDetailsCard'

export const VoteDetailsPage = () => {
	const router = useRouter()
	const id = router.query.id as string

	const { data, error, isLoading } = useQuery<VoteDetails | undefined, Error>(
		[`vote`, id],
		() => getVoteDetails({ voteId: id })
	)
	return (
		<DefaultLayout title='Votes' onBack={() => router.back()}>
			<section>
				{isLoading && !data && (
					<DefaultLayout title='Votes'>
						<Typography>Loading</Typography>
					</DefaultLayout>
				)}
				{!isLoading && error && (
					<DefaultLayout title='Votes'>
						<Typography>An error occured while loading</Typography>
					</DefaultLayout>
				)}
				{!isLoading && !data && (
					<DefaultLayout title='Votes'>
						<Typography>Vote Not Found</Typography>
					</DefaultLayout>
				)}
				{data && <VoteDetailsCard {...data} />}
			</section>
		</DefaultLayout>
	)
}
