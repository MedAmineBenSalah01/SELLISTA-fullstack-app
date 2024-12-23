const context = async ({ req }) => {
    const token = req.headers.authorization || '';
    if (token === 'Bearer admin') {
        return { user: { role: 'admin' } };
    } else if (token === 'Bearer user') {
        return { user: { role: 'user' } };
    }
    throw new Error('Unauthorized');
};

module.exports = context