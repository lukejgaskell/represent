"use strict"
const AWS = require("aws-sdk")
const axios = require("axios")

const getMembersUrl = chamber =>
  `https://api.propublica.org/congress/v1/117/${chamber}/members.json`
const API_KEY = process.env.API_KEY
const MEMBERS_TABLE = process.env.MEMBERS_TABLE
const dynamoDbClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" })

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
      PutRequest: {
        Item: {
          ...member,
          chamber: "house",
          id: member.id,
        },
      },
    }))

    const senateItems = senateMembers.results[0].members.map(member => ({
      PutRequest: {
        Item: {
          ...member,
          chamber: "senate",
          id: member.id,
        },
      },
    }))

    const items = houseItems.concat(senateItems)

    for (let i = 0; i < items.length; ) {
      const batch = items.slice(i, i + 24)
      console.info(`Writing batch items ${i + batch.length} of ${items.length}`)

      await dynamoDbClient
        .batchWrite({
          RequestItems: {
            [MEMBERS_TABLE]: batch,
          },
        })
        .promise()
      i = i + batch.length
    }

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
