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
	vetoed: string
	summary: string
	introduced_date: string
	primary_subject: string
	house_passage: string
	senate_passage: string
	actions: BillAction[]
}

export type VoteDetails = {
	id: string
	bill_id: string
	bill: Bill
}
