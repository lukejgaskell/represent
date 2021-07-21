"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")
const congressSession = 117

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.co", process.env.SUPABASE_SERVICE_KEY)

const getMembersUrl = chamber => `https://api.propublica.org/congress/v1/${congressSession}/${chamber}/members.json`
const getMemberUrl = memberId => `https://api.propublica.org/congress/v1/members/${memberId}.json`

const API_KEY = process.env.API_KEY

async function getMembersWithDistricts(members) {
  const requests = members.map(m =>
    axios
      .get(getMemberUrl(m.id), { headers: { "X-API-Key": API_KEY } })
      .then(r => ({ id: r.data.results[0].id, district: r.data.results[0].roles?.[0]?.district }))
  )

  const results = await Promise.all(requests)
  return members.map(m => ({ ...m, district: results.find(r => r.id === m.id)?.district }))
}

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    const houseMembers = await axios
      .get(getMembersUrl("house"), { headers: { "X-API-Key": API_KEY } })
      .then(r => r.data.results[0].members)

    const senateMembers = await axios
      .get(getMembersUrl("senate"), { headers: { "X-API-Key": API_KEY } })
      .then(r => r.data.results[0].members)

    const members = await getMembersWithDistricts(houseMembers.concat(senateMembers))

    const itemsToSave = members.map(member => ({
      metadata: { ...member },
      district: member.district,
      state: member.state,
      id: member.id,
    }))

    const { data, error } = await supabase.from("members").upsert(itemsToSave, { returning: "minimal" })

    if (error) {
      console.info(`error while saving to db`, error)
    }

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
