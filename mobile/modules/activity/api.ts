import supabase from "../../lib/supabaseClient"
import { Activity, ActivityDetails } from "./types"

type IProps = {
  page: number
  district: string
  state: string
}

export async function getActivity({ page, district, state }: IProps) {
  const pageSize = 15
  const start = page * pageSize
  const end = (page + 1) * pageSize
  const { data, error } = await supabase
    .from<Activity>("votes")
    .select(
      `id, bill_id, metadata->description, metadata->question, metadata->result,
  		metadata->total, date, chamber, metadata->source,
  		memberVotes(state, district, metadata->name, metadata->vote_position)`
    )
    .filter("memberVotes.state" as any, "eq", state)
    .or(`district.eq.${district},district.is.null`, {
      foreignTable: "memberVotes",
    })
    .order(`date`, { ascending: false })
    .range(start, end)
  if (error) return { error }

  const hasMore = (data?.length || 0) >= pageSize
  const nextPage = page + 1
  return { data: { hasMore, items: data, nextPage }, error: null }
}

export async function getActivityDetails({ activityId }: { activityId: string }) {
  const { data, error } = await supabase
    .from<ActivityDetails>("votes")
    .select(
      `id, bill_id,
			bill:bill_id (metadata->title, metadata->enacted,
				metadata->latest_major_action, metadata->latest_major_action_date,
				metadata->sponsor_name, metadata->introduced_date, metadata->primary_subject, 
				metadata->summary_short, metadata->summary, metadata->house_passage, 
				metadata->senate_passage, metadata->primary_subject, metadata->vetoed)`
    )
    .filter("id", "eq", activityId)
  if (error) throw error

  const activity = data?.find(() => true)

  return { data: activity, error }
}
