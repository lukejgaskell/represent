import { ArgsType, Field, Int, ObjectType } from "type-graphql"

export type VoteApiResponse = {
  status: string
  copyright: string
  results: {
    chamber: string
    offset: number
    num_results: number
    votes: [
      {
        congress: number
        chamber: string
        session: number
        roll_call: number
        source: string
        url: string
        vote_uri: string
        bill: {
          number: string
          bill_id: string
          api_url: string
          title: string
          latest_action: string
        }
        question: string
        description: string
        vote_type: string
        date: string
        time: string
        result: string
        democratic: {
          yes: number
          no: number
          present: number
          not_voting: number
          majority_position: string
        }
        republican: {
          yes: number
          no: number
          present: number
          not_voting: number
          majority_position: string
        }
        independent: {
          yes: number
          no: number
          present: number
          not_voting: number
        }
        total: {
          yes: number
          no: number
          present: number
          not_voting: number
        }
      }
    ]
  }
}

@ObjectType()
class Tally {
  @Field()
  yes: number
  @Field()
  no: number
  @Field()
  present: number
  @Field()
  notVoting: number
  @Field(() => String, { nullable: true })
  majorityPosition?: string
}

@ObjectType()
class Items {
  @Field()
  result: string
  @Field(() => String, { nullable: true })
  billTitle?: string
  @Field()
  description: string
  @Field()
  rollCall: number
  @Field()
  date: string
  @Field()
  time: string
  @Field()
  voteType: string
  @Field()
  question: string
  @Field()
  billId: string
  @Field(() => Tally)
  republican: Tally
  @Field(() => Tally)
  democratic: Tally
  @Field(() => Tally)
  independent: Tally
  @Field(() => Tally)
  total: Tally
}

@ObjectType()
export class VotesResponse {
  @Field()
  chamber: string
  @Field()
  offset: number
  @Field()
  count: number
  @Field(() => [Items])
  items: Items[]
}

@ArgsType()
export class GetVotesArgs {
  @Field(() => Int, { defaultValue: 0 })
  offset?: number
}
