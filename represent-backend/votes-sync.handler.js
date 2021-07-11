"use strict"
const AWS = require("aws-sdk")
const axios = require("axios")

const votesUrl = "https://api.propublica.org/congress/v1/both/votes/recent.json"
const API_KEY = process.env.API_KEY
const VOTES_TABLE = process.env.VOTES_TABLE
const dynamoDbClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" })

module.exports.run = async (event, context) => {
  console.info(`Cron function "${context.functionName}" is starting`)

  try {
    const data = await axios
      .get(votesUrl, { headers: { "X-API-Key": API_KEY } })
      .then(r => r.data)

    const items = data.results.votes.map(vote => ({
      PutRequest: {
        Item: {
          ...vote,
          yearMonth: vote.date.slice(0, 7),
          dateTime: `${vote.date}|${vote.time}`,
        },
      },
    }))
    await dynamoDbClient
      .batchWrite({
        RequestItems: {
          [VOTES_TABLE]: items,
        },
      })
      .promise()

    console.info(`Cron function "${context.functionName}" is finished`)
  } catch (e) {
    console.info(`error while running the function`, e)
  }
}
