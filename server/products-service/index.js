const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const {buildFederatedSchema} = require('@apollo/federation')
const typeDefs = require('./schema');
const resolvers = require('./resolvers')

const server = new ApolloServer({ 
  schema: buildFederatedSchema([{
    typeDefs,
    resolvers
  }]),
 });



startStandaloneServer(server, {
  listen: { port: 4001 },
}).then(({ url }) => {
  console.log(`Products service ready at ${url}`);
});
