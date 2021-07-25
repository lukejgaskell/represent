"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.co", process.env.SUPABASE_SERVICE_KEY)

const votesUrl = "https://api.propublica.org/congress/v1/both/votes/recent.json"
const getVoteUrl = (congress, chamber, session, rollCallNumber) => `https://api.propublica.org/congress/v1/${congress}/${chamber}/sessions/${session}/votes/${rollCallNumber}.json`
const API_KEY = process.env.API_KEY

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    const votesReponse = await axios.get(votesUrl, { headers: { "X-API-Key": API_KEY } }).then(r => r.data)

    const votes = votesReponse.results.votes.map(vote => ({
      metadata: { ...vote },
      chamber: vote.chamber,
      date: v.date,
      id: `${vote.chamber}|${vote.congress}|${vote.session}|${vote.roll_call}`,
    }))

    {
      const { data, error } = await supabase.from("votes").upsert(votes, { returning: "minimal" })

      if (error) {
        console.info(`error while saving votes to db`, error)
      }
    }
    {
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
          chamber: curr.chamber,
          congress: curr.congress,
          session: curr.session,
          roll_call: curr.roll_call,
          member_id: v.member_id,
          metadata: { ...v },
        }))

        return [...acc, ...pos]
      }, [])

      const { data, error } = await supabase.from("memberVotes").upsert(items, { returning: "minimal" })

      if (error) {
        console.info(`error while saving member votes to db`, error)
      }
    }

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
