const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  "https://ijxfwjuurxppacepegmf.supabase.co",
  process.env.SUPABASE_SERVICE_KEY
)

const getVotes = async (page, pageSize) => {
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const { data, error, count } = await supabase
    .from("votes")
    .select()
    .range(start, end)

  const items = data.map(v => v.metadata)

  return { items, count: count || 1 }
}

const getMembers = async (page, pageSize) => {
  const start = (page - 1) * pageSize
  const end = page * pageSize
  const { data, error, count } = await supabase
    .from("members")
    .select()
    .range(start, end)

  const items = data.map(m => m.metadata)

  return { items, count: count || 1 }
}

module.exports.resolvers = {
  Query: {
    votes: (root, args) => getVotes(args.page, args.pageSize),
    members: (root, args) => getMembers(args.page, args.pageSize),
  },
}
