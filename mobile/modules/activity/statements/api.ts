import { StatementResponse } from "./types"
import supabase from "../../../lib/supabaseClient"

export async function getStatements(statementIds: Array<string> | undefined) {
  const { data, error } = await supabase
    .from<StatementResponse>("statements")
    .select(`id, metadata, date`)
    .filter("id", "in", `(${statementIds})`)

  if (error) return { error }

  const result = data.map(v => ({ ...v.metadata, type: "statement", id: v.id, date: v.date }))
  return { data: result, error: null }
}
