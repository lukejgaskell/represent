type VoteCounts = {
	yes: number
	no: number
	not_voting: number
	present: number
}

export type Vote = {
	description: string
	question: string
	chamber: string
	source: string
	result: string
	total: VoteCounts
	metadata: string
	date: string
	title: string
	latest_action: string
}
