const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { gql } = require('graphql-tag');
const {buildFederatedSchema} = require('@apollo/federation')


const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Mobile Phones" },
];



const typeDefs = gql`
type Category @key(fields:"id") {
  id: ID!
  name: String!
}
extend type Query {
  categories: [Category!]!
}
`;


const resolvers = {
  Query: {
    categories: () => categories,
  },
  Category: {
    __resolveReference: (reference) => {
      return categories.find((c) => c.id === reference.id);
    },
  },
};


const server = new ApolloServer({
  schema : buildFederatedSchema([{typeDefs,resolvers}])
})


startStandaloneServer(server, {
  listen: { port: 4002 },
}).then(({ url }) => {
  console.log(`Categories service ready at ${url}`);
});




