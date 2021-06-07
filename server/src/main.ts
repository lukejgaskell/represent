import "reflect-metadata"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { VotesResolver } from "./resolvers/votes.resolver"

async function startApolloServer() {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [VotesResolver],
      validate: false,
    }),
  })

  apolloServer.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    )
  })
}

startApolloServer()
