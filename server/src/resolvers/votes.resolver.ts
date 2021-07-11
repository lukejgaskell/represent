import axios from "axios"
import { Resolver, Query, Args } from "type-graphql"
import { GetVotesArgs, VoteApiResponse, VotesResponse } from "./votes.model"
import config from "../config"

@Resolver()
export class VotesResolver {
  @Query(() => VotesResponse)
  votes(@Args() { offset }: GetVotesArgs): Promise<VotesResponse> {
    return axios
      .get(`${config.apiBaseUrl}/house/votes/recent.json`, {
        headers: { "X-API-Key": config.apiKey },
        params: { offset },
      })
      .then(res => res.data)
      .then((data: VoteApiResponse) => {
        return {
          chamber: data.results.chamber,
          offset: data.results.offset,
          count: data.results.num_results,
          items: data.results.votes.map(v => {
            return {
              result: v.result,
              billTitle: v.bill.title,
              description: v.description,
              rollCall: v.roll_call,
              date: v.date,
              time: v.time,
              voteType: v.vote_type,
              question: v.question,
              billId: v.bill.bill_id,
              republican: {
                yes: v.republican.yes,
                no: v.republican.no,
                present: v.republican.present,
                notVoting: v.republican.not_voting,
                majorityPosition: v.republican.majority_position,
              },
              democratic: {
                yes: v.democratic.yes,
                no: v.democratic.no,
                present: v.democratic.present,
                notVoting: v.democratic.not_voting,
                majorityPosition: v.democratic.majority_position,
              },
              independent: {
                yes: v.independent.yes,
                no: v.independent.no,
                present: v.independent.present,
                notVoting: v.independent.not_voting,
              },
              total: {
                yes: v.total.yes,
                no: v.total.no,
                present: v.total.present,
                notVoting: v.total.not_voting,
              },
            }
          }),
        }
      })
  }
}
