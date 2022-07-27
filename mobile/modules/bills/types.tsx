export type BillTable = {
  id: string
  metadata: Bill
}

export type Bill = {
  id: string
  bill_id: string
  number: string
  congressdotgov_url: string
  latest_major_action: string
  latest_major_action_date: string
  introduced_date: string
  title: string
  short_title: string
  summary: string
  committees: string
  sponsor_name: string
  house_passage: string
  senate_passage: string
  enacted: string
  sponsor_state: string
  summary_short: string
  primary_subject: string
  presidential_statements: PresStatements[]
  versions: Version[]
}

export type Version = {
  url: string
  status: string
  title: string
  congressdotgov_url: string
}

export type PresStatements = {
  url: string
  date: string
  position: string
  would_sign: string
  veto_threat: string
}
