"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  "https://ijxfwjuurxppacepegmf.supabase.co",
  process.env.SUPABASE_SERVICE_KEY
)

const getMembersUrl = chamber =>
  `https://api.propublica.org/congress/v1/117/${chamber}/members.json`
const API_KEY = process.env.API_KEY

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    const houseMembers = await axios
      .get(getMembersUrl("house"), { headers: { "X-API-Key": API_KEY } })
      .then(r => r.data)

    const senateMembers = await axios
      .get(getMembersUrl("senate"), { headers: { "X-API-Key": API_KEY } })
      .then(r => r.data)

    const houseItems = houseMembers.results[0].members.map(member => ({
      metadata: { ...member },
      id: "house|" + member.id,
    }))

    const senateItems = senateMembers.results[0].members.map(member => ({
      metadata: { ...member },
      id: "senate|" + member.id,
    }))

    const items = houseItems.concat(senateItems)

    const { data, error } = await supabase
      .from("members")
      .upsert(items, { upsert: true, returning: "minimal" })

    if (error) {
      console.info(`error while saving to db`, error)
    }

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
