"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.in", process.env.SUPABASE_SERVICE_KEY)

const statementsUrl = `https://api.propublica.org/congress/v1/statements/latest.json`

const API_KEY = process.env.API_KEY

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    const statementsResponse = await axios.get(statementsUrl, { headers: { "X-API-Key": API_KEY } }).then(r => r.data)
    const today = new Date()
    const tomorrow = today.setDate(today.getDate() + 1)
    const statements = statementsResponse.results
      .filter(s => new Date(s.date) < tomorrow)
      .map(s => ({
        id: `${s.member_id}-${s.date}`,
        member_id: s.member_id,
        date: s.date,
        metadata: { ...s },
      }))

    const { data, error } = await supabase.from("statements").upsert(statements, { returning: "minimal" })

    if (error) {
      console.info(`error while saving to db`, error)
    }

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
