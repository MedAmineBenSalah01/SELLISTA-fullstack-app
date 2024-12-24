const { gql } = require('graphql-tag');

const typeDefs = gql`
type Category @key(fields:"id") {
  id: ID!
  name: String!
}
extend type Query {
  categories: [Category!]!
}
`;

module.exports = typeDefs;