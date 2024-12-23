const getProducts = require('./utils/product')

const resolvers = {
    Query: {
        products: () => getProducts(),
    },
    Mutation: {
        updateProductName: (_, { id, name }, { user }) => {
            const products = getProducts();
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

module.exports = resolvers;