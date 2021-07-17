import { DefaultLayout } from 'components/layouts/DefaultLayout'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FormControl, Grid, InputLabel, Select } from '@material-ui/core'
import { Member } from './Member.type'
import { usePaginatedData } from 'lib/usePaginatedData'
import { MemberCard } from '@/ui/members/MemberCard'
import supabase from 'lib/supabaseClient'
import { states } from 'lib/stateHelper'

export const RepresentativesPage = () => {
	const [filterState, setFilterState] = useState<string>('')
	const { data, error, hasMore, page, setPage } = usePaginatedData<Member>(
		`members${filterState}`,
		15,
		async (key: string, start: number, end: number) => {
			let query = supabase
				.from<Member>('members')
				.select(
					`id, metadata->first_name, metadata->last_name, metadata->title, metadata->party, metadata->votes_with_party_pct, metadata->missed_votes_pct, metadata->state, metadata->facebook_account, metadata->youtube_account, metadata->twitter_account, metadata->contact_form, metadata->next_election`
				)
				.order(`metadata->state, metadata->title, metadata->last_name` as any)
				.range(start, end)
			console.log('filtering', filterState)
			if (filterState && filterState.length > 0) {
				query = query.filter('metadata->>state' as any, 'eq', filterState)
			}
			const { data, error } = await query
			if (error) throw error

			return data
		}
	)

	function handleFilter(
		event: React.ChangeEvent<{
			name?: string | undefined
			value: unknown
		}>
	) {
		setFilterState(event.target.value as string)
		setPage(1)
	}

	return (
		<DefaultLayout>
			<section>
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
							<Grid item>
								<FormControl>
									<InputLabel htmlFor='state-options'>
										Filter By State
									</InputLabel>
									<Select
										native
										value={filterState}
										onChange={handleFilter}
										inputProps={{
											id: 'state-options',
										}}
									>
										<option aria-label='None' value='' />
										{states.map((s) => (
											<option key={s.abbreviation} value={s.abbreviation}>
												{s.name}
											</option>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<InfiniteScroll
							className='pr-2 pl-2'
							dataLength={data?.length || 0} //This is important field to render the next data
							next={() => setPage(page + 1)}
							hasMore={hasMore}
							loader={<h2 className='pt-2'>Loading...</h2>}
							endMessage={<h2>no more items</h2>}
						>
							<Grid container direction='column' spacing={2}>
								{data?.map((r: Member) => (
									<MemberCard key={r.id} {...r} />
								))}
							</Grid>
						</InfiniteScroll>
					</Grid>
				</Grid>
			</section>
		</DefaultLayout>
	)
}
