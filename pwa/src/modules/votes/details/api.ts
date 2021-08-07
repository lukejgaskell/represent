import supabase from 'lib/supabaseClient'
import { VoteDetails } from './types'

export async function getVoteDetails({ voteId }: { voteId: string }) {
	const { data, error } = await supabase
		.from<VoteDetails>('votes')
		.select(
			`id, bill_id,
			bill:bill_id (metadata->number, metadata->title, metadata->actions, 
				metadata->sponsor, metadata->introduced_date, metadata->primary_subject, 
				metadata->summary_short, metadata->summary, metadata->house_passage, 
				metadata->senate_passage, metadata->primary_subject, metadata->vetoed)`
		)
		.filter('id', 'eq', voteId)
	if (error) throw error

	const vote = data?.find(() => true)

	return vote
}
