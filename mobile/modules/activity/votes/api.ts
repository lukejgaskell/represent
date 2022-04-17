import { VoteResponse } from "./types"
import supabase from "../../../lib/supabaseClient"

type GetVotesProps = {
  voteIds: Array<string> | undefined
  state: string | undefined | null
  district: string | undefined | null
}

export async function getVotes({ voteIds, state, district }: GetVotesProps) {
  const { data, error } = await supabase
    .from<VoteResponse>("votes")
    .select(
      `id, metadata, bill_id,
      memberVotes(state, district, metadata->name, metadata->vote_position),
      bill:bill_id (metadata->title, metadata->enacted,
        metadata->latest_major_action, metadata->latest_major_action_date,
        metadata->sponsor_name, metadata->introduced_date, metadata->primary_subject, 
        metadata->summary_short, metadata->summary, metadata->house_passage, 
        metadata->senate_passage, metadata->primary_subject, metadata->vetoed)`
    )
    .filter("id", "in", `(${voteIds})`)
    .filter("memberVotes.state" as any, "eq", state)
    .or(`district.eq.${district},district.is.null`, {
      foreignTable: "memberVotes",
    })

  if (error) return { error }

  const result = data.map(d => ({
    ...d.metadata,
    bill_id: d.bill_id,
    bill: d.bill,
    memberVotes: d.memberVotes,
    type: "vote",
    id: d.id,
  }))

  return { data: result, error: null }
}
