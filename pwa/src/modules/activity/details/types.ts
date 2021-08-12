export type Bill = {
	title: string
	sponsor_name: string
	summary_short: string
	summary: string
	vetoed: string
	enacted: string
	introduced_date: string
	primary_subject: string
	house_passage: string
	senate_passage: string
	latest_major_action: string
	latest_major_action_date: string
}

export type VoteDetails = {
	id: string
	bill_id: string
	bill: Bill
}
