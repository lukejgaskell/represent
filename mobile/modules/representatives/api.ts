import { MemberExpenseResponse, Representative } from "./types"
import supabase from "../../lib/supabaseClient"
import { flatten } from "../../lib/utils";

export async function getMembers({ state, district }: { state?: string; district?: string }) {
  let query = supabase
    .from<Representative>("members")
    .select(
      `id, type, metadata->first_name, metadata->last_name, metadata->title, metadata->party, metadata->votes_with_party_pct, metadata->missed_votes_pct, metadata->state, metadata->facebook_account, metadata->youtube_account, metadata->twitter_account, metadata->contact_form, metadata->next_election`
    )
    .filter(`metadata->in_office` as any, "eq", true)

  if (state && state.length > 0) query = query.filter("state", "eq", state)
  if (district && district.length > 0) query = query.or(`district.eq.${district},district.is.null`)

  const { data, error } = await query.order(`state, metadata->title, metadata->last_name` as any)

  return { data, error }
}


export async function getMemberExpenses(memberId?: string) {
  let query = supabase
    .from<MemberExpenseResponse>("memberExpenses")
    .select(
      `metadata, year, quarter`
    ).filter(`member_id`, 'eq', memberId)

  const { data, error } = await query
  const value = data?.map(me => me.metadata.map(m => ({...m, year: me.year, quarter: me.quarter}))).reduce(flatten, [])
  return { data: value, error }
}