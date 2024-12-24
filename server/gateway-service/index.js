const { ApolloServer } = require('@apollo/server');
const { ApolloGateway } = require('@apollo/gateway');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { IntrospectAndCompose } = require('@apollo/gateway');

const context = ({ req }) => {
  const token = req.headers.authorization || '';
  if (token === 'Bearer admin') {
    return { user: { role: 'admin' } };
  } else if (token === 'Bearer user') {
    return { user: { role: 'user' } };
  }
  throw new Error('Unauthorized');
};
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs : [
        { name: 'products', url: 'http://localhost:4001' },
        { name: 'categories', url: 'http://localhost:4002' },

    ]
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
