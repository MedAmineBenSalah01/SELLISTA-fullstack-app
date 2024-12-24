const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { gql } = require('graphql-tag');
const {buildFederatedSchema} = require('@apollo/federation')




const currentUser = {
  role: "user", 
};

let products = [
  { id: "1", name: "Laptop", price: 1200.99, categoryId: "1" },
  { id: "2", name: "Phone", price: 699.49, categoryId: "2" },
];
const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Mobile Phones" },
];

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


const resolvers = {
  Product : {
    category: (product) => {
      return [{ id: product.categoryId }];
    },
    price: (product) => {
      if (currentUser.role === "user") {
        return Math.round(product.price); 
      }
      return product.price; 
    },
  },
  Query: {
    products: (_, { search }) => {
      if (!search) return products;
      return products.filter((product) => {
        const category = categories.find((cat) => cat.id === product.categoryId);
        const matchesProductName = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategoryName = category && category.name.toLowerCase().includes(search.toLowerCase());
        return matchesProductName || matchesCategoryName;
      });
    },
  },
  Mutation: {
    updateProductName: (_, { id, name }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      product.name = name;
      return product;
    },
  },
};



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
