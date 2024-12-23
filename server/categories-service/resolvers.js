const getCategories = require('./utils/categories');

const resolvers = {
    Query: {
      categories: () => getCategories(),
    },
};


module.exports = resolvers;