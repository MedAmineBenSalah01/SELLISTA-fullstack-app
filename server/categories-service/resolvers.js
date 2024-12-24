const getCategories = require('./utils/categories');

const categories = getCategories();

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

module.exports = resolvers;