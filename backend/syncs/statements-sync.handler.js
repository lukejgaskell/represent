"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.in", process.env.SUPABASE_SERVICE_KEY)

const getStatementsUrl = date => `https://api.propublica.org/congress/v1/statements/date/${toIsoString(date)}.json`

const API_KEY = process.env.API_KEY

function toIsoString(date) {
  function pad(num) {
    var norm = Math.floor(Math.abs(num))
    return (norm < 10 ? "0" : "") + norm
  }

  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate())
}

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  const today = new Date()
  const yesterday = new Date(today)

  yesterday.setDate(today.getDate() - 1)

  console.log(`getting statements for ${today} amd ${yesterday}`)

  try {
    const sr1 = await axios.get(getStatementsUrl(today), { headers: { "X-API-Key": API_KEY } }).then(r => r.data)
    const sr2 = await axios.get(getStatementsUrl(yesterday), { headers: { "X-API-Key": API_KEY } }).then(r => r.data)

    const statements = sr1.results.concat(sr2.results).map(s => ({
      id: `${s.member_id}-${s.date}`,
      member_id: s.member_id,
      date: s.date,
      metadata: { ...s },
    }))

    const { error } = await supabase.from("statements").upsert(statements, { returning: "minimal" })

    if (error) {
      console.info(`error while saving to db`, error)
    }

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
