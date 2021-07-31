"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.co", process.env.SUPABASE_SERVICE_KEY)

const votesUrl = "https://api.propublica.org/congress/v1/both/votes/recent.json"
const getVoteUrl = (congress, chamber, session, rollCallNumber) => `https://api.propublica.org/congress/v1/${congress}/${chamber}/sessions/${session}/votes/${rollCallNumber}.json`
const getBillUrl = (congress, billId) => `https://api.propublica.org/congress/v1/${congress}/bills/${billId}.json`

const API_KEY = process.env.API_KEY

async function syncMemberVotes(votes) {
  const votesResponses = votes.map(v =>
    axios
      .get(getVoteUrl(v.metadata.congress, v.metadata.chamber, v.metadata.session, v.metadata.roll_call), { headers: { "X-API-Key": API_KEY } })
      .then(r => r.data.results.votes.vote)
  )

  const results = await Promise.all(votesResponses)

  const items = results.reduce((acc, curr) => {
    const { positions } = curr

    const pos = positions.map(v => ({
      id: `${curr.chamber}|${curr.congress}|${curr.session}|${curr.roll_call}|${v.member_id}`,
      vote_id: `${curr.chamber}|${curr.congress}|${curr.session}|${curr.roll_call}`,
      member_id: v.member_id,
      state: v.state || null,
      district: v.district || null,
      metadata: { ...v },
    }))

    return [...acc, ...pos]
  }, [])

  const { data, error } = await supabase.from("memberVotes").upsert(items, { returning: "minimal" })

  if (error) {
    console.info(`error while saving member votes to db`, error)
  }
}

async function syncBills(votes) {
  const billResponses = votes
    .filter(v => v.bill?.bill_id)
    .map(v => axios.get(getBillUrl(v.metadata.congress, metadata.bill.bill_id), { headers: { "X-API-Key": API_KEY } }).then(r => r.data.results))

  const results = await Promise.all(billResponses)

  const items = results.map(r => {
    const { bill_id } = r

    return { id: bill_id, metadata: { ...r } }
  }, [])

  const { data, error } = await supabase.from("bills").upsert(items, { returning: "minimal" })

  if (error) {
    console.info(`error while saving bills to db`, error)
  }
}

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    const votesReponse = await axios.get(votesUrl, { headers: { "X-API-Key": API_KEY } }).then(r => r.data)

    const votes = votesReponse.results.votes.map(vote => ({
      metadata: { ...vote },
      chamber: vote.chamber,
      date: `${vote.date}T${vote.time}`,
      id: `${vote.chamber}|${vote.congress}|${vote.session}|${vote.roll_call}`,
    }))

    await syncMemberVotes(votes)

    await syncBills(votes)

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
