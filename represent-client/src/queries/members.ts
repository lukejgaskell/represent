import { Member } from 'modules/representatives/Member.type'
import supabase from 'lib/supabaseClient'
import { Paginated } from 'types/Paginated'

export async function getMembers({
	page,
	state,
	district,
}: {
	page: number
	state: string | undefined
	district: string | undefined
}) {
	const pageSize = 15
	const start = page * pageSize
	const end = (page + 1) * pageSize
	let query = supabase
		.from<Member>('members')
		.select(
			`id, metadata->first_name, metadata->last_name, metadata->title, metadata->party, metadata->votes_with_party_pct, metadata->missed_votes_pct, metadata->state, metadata->facebook_account, metadata->youtube_account, metadata->twitter_account, metadata->contact_form, metadata->next_election`
		)
		.filter(`metadata->in_office` as any, 'eq', true)

	if (state && state.length > 0) query = query.filter('state', 'eq', state)
	if (district && district.length > 0)
		query = query.or(`district.eq.${district},district.is.null`)

	const { data, error } = await query
		.order(`state, metadata->title, metadata->last_name` as any)
		.range(start, end)
	if (error) throw error

	const hasMore = (data?.length || 0) >= pageSize
	const nextPage = page + 1
	return { hasMore, items: data, nextPage } as Paginated<Member>
}
