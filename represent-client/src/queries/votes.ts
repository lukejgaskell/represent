import supabase from 'lib/supabaseClient'
import { Paginated } from '@/types/Paginated'
import { Vote } from '@/modules/votes/Vote.type'

export async function getVotes({
	page,
	district,
	state,
}: {
	page: number
	district: string
	state: string
}) {
	const pageSize = 15
	const start = page * pageSize
	const end = (page + 1) * pageSize
	const { data, error } = await supabase
		.from<Vote>('votes')
		.select(
			`metadata->description, metadata->question, metadata->result,
			metadata->total, date, chamber, metadata->source, metadata->bill->bill_id,
			memberVotes(state, district, metadata->name, metadata->vote_position)`
		)
		.filter('memberVotes.state' as any, 'eq', state)
		.or(`district.eq.${district},district.is.null`, {
			foreignTable: 'memberVotes',
		})
		.order(`date`, { ascending: false })
		.range(start, end)
	if (error) throw error

	const hasMore = (data?.length || 0) >= pageSize
	const nextPage = page + 1
	return { hasMore, items: data, nextPage } as Paginated<Vote>
}
