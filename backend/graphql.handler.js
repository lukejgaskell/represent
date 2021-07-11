import { ApolloServer } from "apollo-server-lambda"
import { schema } from "./graphql.schema"
import { resolvers } from "./graphql.resolvers"

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

export default server.createHandler({
  cors: {
    origin: "*",
  },
})