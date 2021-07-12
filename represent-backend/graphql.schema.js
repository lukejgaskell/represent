const { gql } = require("apollo-server-lambda")
module.exports.schema = gql`
  type Query {
    votes(page: Int!, pageSize: Int!): VotesReponse
    members(page: Int!, pageSize: Int!): MembersResponse
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

  type MembersResponse {
    items: [Member!]!
    count: Int!
  }

  type Member {
    id: String
    title: String
    chamber: String
    short_title: String
    api_uri: String
    first_name: String
    middle_name: String
    last_name: String
    suffix: String
    date_of_birth: String
    gender: String
    party: String
    leadership_role: String
    twitter_account: String
    facebook_account: String
    youtube_account: String
    govtrack_id: String
    cspan_id: String
    votesmart_id: String
    icpsr_id: String
    crp_id: String
    google_entity_id: String
    fec_candidate_id: String
    url: String
    rss_url: String
    contact_form: String
    in_office: Boolean
    cook_pvi: String
    dw_nominate: Float
    ideal_point: String
    seniority: String
    next_election: String
    total_votes: Int
    missed_votes: Int
    total_present: Int
    last_updated: String
    ocd_id: String
    office: String
    phone: String
    fax: String
    state: String
    district: String
    at_large: Boolean
    geoid: String
    missed_votes_pct: Float
    votes_with_party_pct: Float
    votes_against_party_pct: Float
  }
`
