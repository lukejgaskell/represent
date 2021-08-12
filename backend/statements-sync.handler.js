"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.in", process.env.SUPABASE_SERVICE_KEY)

const getStatementsUrl = today => `https://api.propublica.org/congress/v1/statements/${today}.json`

const API_KEY = process.env.API_KEY

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  const today = new Date().toISOString().split("T")[0]

  try {
    const statementsResponse = await axios.get(getStatementsUrl(today), { headers: { "X-API-Key": API_KEY } }).then(r => r.data)
    const statements = statementsResponse.results.map(s => ({
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
