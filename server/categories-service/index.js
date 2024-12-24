const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const {buildFederatedSchema} = require('@apollo/federation')
const typeDefs = require('./schema');
const resolvers = require('./resolvers')



const server = new ApolloServer({
  schema : buildFederatedSchema([{typeDefs,resolvers}])
})


startStandaloneServer(server, {
  listen: { port: 4002 },
}).then(({ url }) => {
  console.log(`Categories service ready at ${url}`);
});




