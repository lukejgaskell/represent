import React from 'react'

import { DefaultLayout } from '@/components/layouts/DefaultLayout'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { VoteDetails } from './types'
import { getVoteDetails } from './api'
import { Typography } from '@material-ui/core'
import { VoteDetailsCard } from './VoteDetailsCard'

export const ActivityDetailsPage = () => {
	const router = useRouter()
	const id = router.query.id as string

	const { data, error, isLoading } = useQuery<VoteDetails | undefined, Error>(
		[`vote`, id],
		() => getVoteDetails({ voteId: id })
	)
	return (
		<DefaultLayout title='Activity' onBack={() => router.back()}>
			<section>
				{isLoading && !data && <Typography>Loading</Typography>}
				{!isLoading && error && (
					<Typography>An error occured while loading</Typography>
				)}
				{!isLoading && !data && <Typography>Vote Not Found</Typography>}
				{data && <VoteDetailsCard {...data} />}
			</section>
		</DefaultLayout>
	)
}
