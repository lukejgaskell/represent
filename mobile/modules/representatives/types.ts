export type MemberExpense = {
  amount: number
  category: string
  year_to_date: number
  category_slug: string
  change_from_previous_quarter: number
  year: string
  quarter: string
}

export type MemberExpenseResponse = {
  member_id: string
  metadata: MemberExpense[]
  year: string
  quarter: string
}

export type Representative = {
  id: string
  type: 'house' | 'senate'
  district: string
  first_name: string
  last_name: string
  title: string
  party: string
  votes_with_party_pct: number
  missed_votes_pct: number
  state: string
  twitter_account: string
  youtube_account: string
  facebook_account: string
  contact_form: string
  next_election: string
}


export type RepresentativeDetails = {
 memberExpenses: MemberExpense[] | undefined
} & NonNullable<Representative>