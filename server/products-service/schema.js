const typeDefs = `
  type Product {
    id: ID!
    name: String!
    price: Float!
    categoryId: ID!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    updateProductName(id: ID!, name: String!): Product!
  }
`;

module.exports = typeDefs;