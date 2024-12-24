const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Product @key(fields:"id") {
    id: ID!
    name: String!
    price: Float!
    categoryId: ID!
    category:[Category]
  }
  
    extend type Category @key(fields:"id") {
    id:ID! @external
    name:String! @external
  }

  extend type Query {
    products(search: String): [Product!]!
  }

  extend type Mutation {
    updateProductName(id: ID!, name: String!): Product!
  }
`;

module.exports = typeDefs