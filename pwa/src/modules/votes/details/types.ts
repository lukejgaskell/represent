import { VoteCounts } from '../types'

export type BillAction = {
	datetime: string
	action_type: string
	description: string
	chamber: string
}

export type Bill = {
	number: string
	title: string
	sponsor: string
	summary_short: string
	introduced_date: string
	primary_subject: string
	actions: BillAction[]
}

export type VoteDetails = {
	id: string
	bill_id: string
	description: string
	question: string
	chamber: string
	total: VoteCounts
	source: string
	result: string
	date: string
	time: string
	title: string
	bills: Bill[]
}
