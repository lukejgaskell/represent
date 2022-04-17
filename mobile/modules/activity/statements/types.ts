export type StatementResponse = {
  id: string
  member_id: string
  date: string
  metadata: Statement
}

export type Statement = {
  type: string
  id: string
  url: string
  date: string
  name: string
  party: string
  title: string
  chamber: string
  member_id: string
  statement_type: string
}
