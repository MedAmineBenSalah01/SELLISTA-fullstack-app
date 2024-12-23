const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

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

let products = [
  { id: '1', name: 'Product A', price: 10.99, categoryId: '1' },
  { id: '2', name: 'Product B', price: 15.49, categoryId: '2' },
];

const resolvers = {
  Query: {
    products: () => products,
  },
  Mutation: {
    updateProductName: (_, { id, name }, { user }) => {
      if (user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error('Product not found');
      product.name = name;
      return product;
    },
  },
};

const context = async ({ req }) => {
  const token = req.headers.authorization || '';
  console.log('=>',token)
  if (token === 'Bearer admin') {
    return { user: { role: 'admin' } };
  } else if (token === 'Bearer user') {
    return { user: { role: 'user' } };
  }
  throw new Error('Unauthorized');
};

const server = new ApolloServer({ typeDefs, resolvers,introspection:true });
startStandaloneServer(server, {
  listen: { port: 4001 },
  context,
}).then(({ url }) => {
  console.log(`Products service ready at ${url}`);
});
