import supabase from 'lib/supabaseClient'
import { VoteDetails } from './types'

export async function getVoteDetails({ voteId }: { voteId: string }) {
	const { data, error } = await supabase
		.from<VoteDetails>('votes')
		.select(
			`id, metadata->description, metadata->question, metadata->result,
			metadata->total, date, chamber, metadata->source, metadata->bill->bill_id,
			bills(metadata->number, metadata->title, metadata->actions, metadata->sponsor, metadata->introduced_date, metadata->primary_subject)`
		)
		.filter('id', 'eq', voteId)
	if (error) throw error

	const vote = data?.find(() => true)

	return vote
}
