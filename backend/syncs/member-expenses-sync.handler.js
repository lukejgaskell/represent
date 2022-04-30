"use strict"
const axios = require("axios")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient("https://ijxfwjuurxppacepegmf.supabase.in", process.env.SUPABASE_SERVICE_KEY)

const getExpensesUrl = ({ memberId, year, quarter }) =>
  `https://api.propublica.org/congress/v1/members/${memberId}/office_expenses/${year}/${quarter}.json`

const currQ = Math.ceil(new Date().getMonth() / 3)
const quarter = (4 + currQ - 2) % 4 || 4 // get 2 quarters ago
const year = [3, 4].some(v => v === quarter) ? new Date().getFullYear() - 1 : new Date().getFullYear()

const API_KEY = process.env.API_KEY

async function makeSafeRequest(url) {
  try {
    const result = await axios.get(url, { headers: { "X-API-Key": API_KEY } })

    return result.data
  } catch (e) {
    console.log(`req failed url: ${url} error: ${e}`)
  }
}

module.exports.run = async () => {
  console.log(`running member expense sync for: year: ${year} quarter: ${quarter}`)
  const { data, error } = await supabase.from("members").select(`id`)

  if (error) {
    console.log("failed to get members - ", error)
    return
  }

  const requests = data.map(m => makeSafeRequest(getExpensesUrl({ memberId: m.id, year, quarter })))

  const results = await Promise.all(requests)
  const items = results
    .filter(r => r && r.num_results > 0)
    .map(r => ({
      id: `${r.member_id}|${r.year}|${r.quarter}`,
      member_id: r.member_id,
      year: parseInt(r.year),
      quarter: parseInt(r.quarter),
      metadata: r.results,
    }))

  const { error: saveError } = await supabase.from("memberExpenses").upsert(items, { returning: "minimal" })
  if (saveError) {
    console.log("failed to save results", error, items)
    return
  }
}
