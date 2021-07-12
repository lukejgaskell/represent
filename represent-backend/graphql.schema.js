const { gql } = require("apollo-server-lambda")
module.exports.schema = gql`
  type Query {
    votes(yearMonth: String!): VotesReponse
  }

  type VotesReponse {
    items: [Vote!]!
    count: Int!
  }

  type RollCounts {
    yes: Int
    no: Int
    present: Int
    not_voting: Int
    majority_position: String
  }

  type Bill {
    bill_id: String
    Int: String
    sponsor_id: String
    api_uri: String
    title: String
    latest_action: String
  }

  type Vote {
    congress: Int
    chamber: String
    session: Int
    roll_call: Int
    source: String
    url: String
    vote_uri: String
    bill: Bill
    question: String
    question_text: String
    description: String
    vote_type: String
    date: String
    time: String
    result: String
    democratic: RollCounts
    republican: RollCounts
    independent: RollCounts
    total: RollCounts
  }
`
