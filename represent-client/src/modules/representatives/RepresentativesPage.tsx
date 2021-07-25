import { DefaultLayout } from '@/modules/layouts/DefaultLayout'
import React from 'react'
import { Grid } from '@material-ui/core'
import { Member } from './Member.type'
import { useQuery } from 'react-query'
import { MemberCard } from '@/ui/members/MemberCard'
import { getMembers } from 'queries/members'
import { useUserStore } from '@/stores/useUserStore'

export const RepresentativesPage = () => {
	const { settings } = useUserStore()
	const { data, error } = useQuery<Member[], Error>(
		[`members`, settings.state, settings.district],
		() =>
			getMembers({
				state: settings.state,
				district: settings.district,
			})
	)

	return (
		<DefaultLayout title='Representatives'>
			<section className='pr-2 pl-2'>
				<Grid container direction='column' spacing={2}>
					<Grid item>
						<Grid
							container
							justifyContent='space-between'
							alignItems='flex-end'
						>
							<Grid item>
								<h2 className='text-xl font-semibold'>Representatives</h2>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction='column' spacing={2}>
							{data?.map((r: Member) => (
								<MemberCard key={r.id} {...r} />
							))}
						</Grid>
					</Grid>
				</Grid>
			</section>
		</DefaultLayout>
	)
}
