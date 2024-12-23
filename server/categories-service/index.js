const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')





const server = new ApolloServer({ typeDefs, resolvers });
startStandaloneServer(server, {
  listen: { port: 4002 },
}).then(({ url }) => {
  console.log(`Categories service ready at ${url}`);
});
