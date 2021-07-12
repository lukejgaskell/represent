const { DynamoDB } = require("aws-sdk")
const dbClient = new DynamoDB.DocumentClient()

const getVotes = async yearMonth => {
  const result = await dbClient
    .query({
      TableName: process.env.VOTES_TABLE,
      KeyConditionExpression: "yearMonth = :yearMonth",
      ExpressionAttributeValues: {
        ":yearMonth": yearMonth,
      },
    })
    .promise()

  return { items: result.Items, count: result.Count }
}

const getMembers = async chamber => {
  const result = await dbClient
    .query({
      TableName: process.env.MEMBERS_TABLE,
      KeyConditionExpression: "chamber = :chamber",
      ExpressionAttributeValues: {
        ":chamber": chamber,
      },
    })
    .promise()

  return { items: result.Items, count: result.Count }
}

module.exports.resolvers = {
  Query: {
    votes: (root, args) => getVotes(args.yearMonth),
    members: (root, args) => getMembers(args.chamber),
  },
}
