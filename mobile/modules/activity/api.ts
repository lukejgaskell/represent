import { ActivityResponse, ActivityType } from "./types"

import supabase from "../../lib/supabaseClient"

type GetActivityProps = {
  page: number
  district: string | null | undefined
  state: string | null | undefined
}

export async function getActivity({ page, district, state }: GetActivityProps) {
  const pageSize = 15
  const start = page * pageSize
  const end = (page + 1) * pageSize

  const { data, error } = await supabase
    .from<ActivityResponse>("activity")
    .select(`id, type, state, district, date`)
    .or(`state.eq.${state},state.is.null`)
    .or(`district.eq.${district},district.is.null`)
    .order(`date`, { ascending: false })
    .range(start, end)
  if (error) return { error }

  const hasMore = (data?.length || 0) >= pageSize
  const nextPage = page + 1
  return { data: { hasMore, items: data, nextPage }, error: null }
}
