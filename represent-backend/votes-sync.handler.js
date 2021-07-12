"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  "https://ijxfwjuurxppacepegmf.supabase.co",
  process.env.SUPABASE_SERVICE_KEY
)

const votesUrl = "https://api.propublica.org/congress/v1/both/votes/recent.json"
const API_KEY = process.env.API_KEY

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    const data = await axios
      .get(votesUrl, { headers: { "X-API-Key": API_KEY } })
      .then(r => r.data)

    const items = data.results.votes.map(vote => ({
      metadata: { ...vote },
      id: `${vote.date}|${vote.time}`,
    }))

    const { data, error } = await supabase
      .from("votes")
      .upsert(items, { upsert: true, returning: "minimal" })

    if (error) {
      console.info(`error while saving to db`, error)
    }

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
