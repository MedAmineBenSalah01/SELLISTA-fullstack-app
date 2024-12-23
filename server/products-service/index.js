const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./utils/context');





const server = new ApolloServer({ typeDefs, resolvers,introspection:true });
startStandaloneServer(server, {
  listen: { port: 4001 },
  context,
}).then(({ url }) => {
  console.log(`Products service ready at ${url}`);
});
