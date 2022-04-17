export type VoteResponse = {
  id: string
  member_id: string
  bill_id: string
  date: string
  metadata: Vote
  memberVotes: MemberVote[]
  bill: Bill
}

export type Vote = {
  type: string
  id: string
  bill_id?: string
  bill: Bill
  description: string
  question: string
  chamber: string
  source: string
  result: string
  total: VoteCounts
  date: string
  time: string
  title: string
  latest_action: string
  memberVotes: MemberVote[]
}

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

export type VoteCounts = {
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
