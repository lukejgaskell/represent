export type BillTable = {
  id: string
  metadata: Bill
}

export type Bill = {
  id: string
  bill_id: string
  latest_major_action: string
  latest_major_action_date: string
  title: string
  summary: string
  committees: string
  sponsor_name: string
  house_passage: string
  senate_passage: string
  sponsor_state: string
  summary_short: string
  primary_subject: string
}
// {
//     "title": "Supporting the Local Radio Freedom Act.",
//     "active": false,
//     "number": "H.CON.RES.33",
//     "vetoed": null,
//     "bill_id": "hconres33-117",
//     "enacted": null,
//     "summary": "This concurrent resolution declares that Congress should not impose any new performance fee, tax, royalty, or other charge relating to the public performance of sound recordings on a local radio station for broadcasting sound recordings over the air, or on any business for such public performance of sound recordings.",
//     "bill_uri": "https://api.propublica.org/congress/v1/117/bills/hconres33.json",
//     "bill_slug": "hconres33",
//     "bill_type": "hconres",
//     "last_vote": null,
//     "committees": "House Judiciary Committee",
//     "cosponsors": 198,
//     "sponsor_id": "C001066",
//     "gpo_pdf_uri": null,
//     "short_title": "Supporting the Local Radio Freedom Act.",
//     "sponsor_uri": "https://api.propublica.org/congress/v1/members/C001066.json",
//     "govtrack_url": "https://www.govtrack.us/congress/bills/117/hconres33",
//     "sponsor_name": "Kathy Castor",
//     "house_passage": null,
//     "sponsor_party": "D",
//     "sponsor_state": "FL",
//     "sponsor_title": "Rep.",
//     "summary_short": "This concurrent resolution declares that Congress should not impose any new performance fee, tax, royalty, or other charge relating to the public performance of sound recordings on a local radio station for broadcasting sound recordings over the air, or on any business for such public performance of sound recordings.",
//     "senate_passage": null,
//     "committee_codes": [
//       "HSJU"
//     ],
//     "introduced_date": "2021-05-04",
//     "primary_subject": "Science, Technology, Communications",
//     "congressdotgov_url": "https://www.congress.gov/bill/117th-congress/house-concurrent-resolution/33",
//     "subcommittee_codes": [
//       "HSJU03"
//     ],
//     "cosponsors_by_party": {
//       "D": 52,
//       "R": 146
//     },
//     "latest_major_action": "Referred to the Subcommittee on Courts, Intellectual Property, and the Internet.",
//     "latest_major_action_date": "2021-11-09"
//   }
