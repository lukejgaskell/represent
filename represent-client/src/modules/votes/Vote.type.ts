type VoteCounts = {
	yes: number
	no: number
	not_voting: number
	present: number
}

export type MemberVote = {
	state: string
	district: string
	vote_position: string
	name: string
}

export type Vote = {
	bill_id: string
	description: string
	question: string
	chamber: string
	source: string
	result: string
	total: VoteCounts
	metadata: string
	date: string
	time: string
	title: string
	latest_action: string
	memberVotes: MemberVote[]
}
