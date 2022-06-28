"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const twoDigetYear = parseInt(new Date().getFullYear().toString().substr(-2))
const congressSession = 106 + Math.ceil(twoDigetYear / 2)

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.in", process.env.SUPABASE_SERVICE_KEY)

const getMembersUrl = chamber => `https://api.propublica.org/congress/v1/${congressSession}/${chamber}/members.json`
const getMemberUrl = memberId => `https://api.propublica.org/congress/v1/members/${memberId}.json`

const API_KEY = process.env.API_KEY

async function makeSafeRequest(url) {
  try {
    const result = await axios.get(url, { headers: { "X-API-Key": API_KEY } })

    return result.data
  } catch (e) {
    console.log(`req failed url: ${url} error: ${e}`)
  }
}

async function getMembersWithDistricts(members) {
  // request in batches
  const results = []
  let position = 0
  const batchSize = 50
  while (position <= members.length) {
    const batchEndPos = position + batchSize
    const batch = members.slice(position, batchEndPos)
    const batchRequests = batch.map(m =>
      makeSafeRequest(getMemberUrl(m.id)).then(r => ({
        id: r.results[0].id,
        district: r.results[0].roles[0].district,
      }))
    )
    results.push(...(await Promise.all(batchRequests)))

    position = batchEndPos
  }

  return members.map(m => ({ ...m, district: results.find(r => r.id === m.id).district }))
}

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    const houseMembers = await makeSafeRequest(getMembersUrl("house")).then(r =>
      r.results[0].members.map(m => ({ ...m, type: "house" }))
    )

    const senateMembers = await makeSafeRequest(getMembersUrl("senate")).then(r =>
      r.results[0].members.map(m => ({ ...m, type: "senate" }))
    )

    const houseMembersWithDistrict = await getMembersWithDistricts(houseMembers)

    const members = houseMembersWithDistrict.concat(senateMembers)

    const itemsToSave = members.map(member => ({
      metadata: { ...member },
      type: member.type,
      district: member.district || null,
      state: member.state || null,
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
