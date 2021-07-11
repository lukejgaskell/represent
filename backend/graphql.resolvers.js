import { DynamoDB } from "aws-sdk"
const dbClient = new DynamoDB.DocumentClient()

// This method just inserts the user's first name into the greeting message.
const getVotes = async yearMonth => {
  const result = await dbClient
    .query({
      TableName: process.env.VOTES_TABLE,
      IndexName: "Index",
      KeyConditionExpression: "yearMonth = :yearMonth",
      ExpressionAttributeValues: {
        ":yearMonth": yearMonth,
      },
    })
    .promise()

  return { items: result.Items, count: result.Count }
}

export default {
  Query: {
    getVotes: (root, args) => getVotes(args.yearMonth),
  },
}
