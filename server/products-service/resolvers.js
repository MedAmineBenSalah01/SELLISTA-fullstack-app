const getProducts = require('./utils/product');
const products = getProducts();
const categories = require('./data/categories-data');

const resolvers = {
    Product : {
      category: (product) => {
        return [{ id: product.categoryId }];
      },
      price: (product, _, context) => {
        if (context?.user?.role === 'user') {
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

module.exports = resolvers;