import { Field, ObjectType } from "type-graphql"

@ObjectType()
class Vote {
  @Field()
  description: string
}

@ObjectType()
class VotesResult {
  @Field()
  chamber: string

  @Field(() => [Vote])
  votes: Vote[]
}

@ObjectType()
export class VotesResponse {
  @Field()
  status: string

  @Field()
  results: VotesResult
}
