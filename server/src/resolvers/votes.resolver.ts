import axios from "axios"
import { Resolver, Query, Arg } from "type-graphql"
import { VotesResponse } from "./votes.model"
import config from "../config"

@Resolver()
export class VotesResolver {
  @Query(() => VotesResponse)
  votes(@Arg("offset") offset: number = 0) {
    console.log("resolver called")
    return axios
      .get(`${config.apiBaseUrl}/house/votes/recent.json`, {
        headers: { "X-API-Key": config.apiKey },
        params: { offset },
      })
      .then(res => res.data)
  }
}
