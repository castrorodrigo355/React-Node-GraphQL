import { GraphQLServer } from "graphql-yoga";
import tydeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import "./database";

const server = new GraphQLServer({
  typeDefs: tydeDefs,
  resolvers
});

server.start({ port: 3000 }, ({ port }) => {
  console.log("Server on port", port);
});
