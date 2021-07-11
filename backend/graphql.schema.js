import { gql } from "apollo-server-lambda"
export default gql`
  type Query {
    getVotes(yearMonth: string!): VotesReponse
  }

  type VotesReponse {
    items: [Vote!]!
    count: number!
  }

  type RollCounts {
    yes: number
    no: number
    present: number
    not_voting: number
    majority_position: string
  }

  type Bill {
    bill_id: string
    number: string
    sponsor_id: string
    api_uri: string
    title: string
    latest_action: string
  }

  type Vote {
    congress: number
    chamber: string
    session: number
    roll_call: number
    source: string
    url: string
    vote_uri: string
    bill: bill
    amendment: object
    question: string
    question_text: string
    description: string
    vote_type: string
    date: string
    time: string
    result: string
    democratic: RollCounts
    republican: RollCounts
    independent: RollCounts
    total: RollCounts
  }
`
