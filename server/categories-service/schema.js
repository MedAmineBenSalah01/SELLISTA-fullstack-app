const typeDefs =`
type Category {
  id: ID!
  name: String!
}
type Query {
  categories: [Category!]!
}
`

module.exports = typeDefs;