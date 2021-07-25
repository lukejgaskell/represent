import { Member } from 'modules/representatives/Member.type'
import supabase from 'lib/supabaseClient'

export async function getMembers({
	state,
	district,
}: {
	state: string | undefined
	district: string | undefined
}) {
	let query = supabase
		.from<Member>('members')
		.select(
			`id, metadata->first_name, metadata->last_name, metadata->title, metadata->party, metadata->votes_with_party_pct, metadata->missed_votes_pct, metadata->state, metadata->facebook_account, metadata->youtube_account, metadata->twitter_account, metadata->contact_form, metadata->next_election`
		)
		.filter(`metadata->in_office` as any, 'eq', true)

	if (state && state.length > 0) query = query.filter('state', 'eq', state)
	if (district && district.length > 0)
		query = query.or(`district.eq.${district},district.is.null`)

	const { data, error } = await query.order(
		`state, metadata->title, metadata->last_name` as any
	)
	if (error) throw error

	return data as Member[]
}
