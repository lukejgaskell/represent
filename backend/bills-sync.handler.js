"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.in", process.env.SUPABASE_SERVICE_KEY)

const billsUrl = `https://api.propublica.org/congress/v1/bills/search.json`

const API_KEY = process.env.API_KEY

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    console.info(`fetching bills`)
    const billsResponse = await axios.get(billsUrl, { headers: { "X-API-Key": API_KEY } }).then(r => r.data)

    const bills = billsResponse.results.bills.map(b => ({
      metadata: { ...b },
      id: bill_id,
    }))
    const { data, error } = await supabase.from("bills").upsert(bills, { returning: "minimal" })

    if (error) {
      console.error(`error while saving bills to db`, error)
    }

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.error(`error while running the function`, e)
  }
}
