import { BillTable } from "./types"
import supabase from "../../lib/supabaseClient"

export async function getBills({ page }: { page: number }) {
  const pageSize = 15
  const start = page * pageSize
  const end = (page + 1) * pageSize

  const { data, error } = await supabase
    .from<BillTable>("bills")
    .select(`id, metadata`)
    .order(`metadata->latest_major_action_date` as any, { ascending: false })
    .range(start, end)
  if (error) return { error }

  const hasMore = (data?.length || 0) >= pageSize
  const nextPage = page + 1
  const items = data.map(d => ({ ...d.metadata, id: d.id }))
  return { data: { hasMore, items, nextPage }, error: null }
}
