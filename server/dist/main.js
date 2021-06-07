"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const votes_resolver_1 = require("./resolvers/votes.resolver");
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const apolloServer = new apollo_server_1.ApolloServer({
            schema: yield type_graphql_1.buildSchema({
                resolvers: [votes_resolver_1.VotesResolver],
                validate: false,
            }),
        });
        apolloServer.listen({ port: 4000 }, () => {
            console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
        });
    });
}
startApolloServer();
//# sourceMappingURL=main.js.map