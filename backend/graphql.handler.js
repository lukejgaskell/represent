const { ApolloServer } = require("apollo-server-lambda")
const { schema } = require("./graphql.schema")
const { resolvers } = require("./graphql.resolvers")

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    console.log(error)
    return error
  },
  formatResponse: response => {
    console.log(response)
    return response
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  playground: {
    endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
      ? process.env.REACT_APP_GRAPHQL_ENDPOINT
      : "/production/graphql",
  },
  tracing: true,
})

module.exports.run = server.createHandler({
  cors: {
    origin: "*",
  },
})
