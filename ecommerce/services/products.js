const productsMock = require('../utils/mocks/products');

class ProductsService {
    constructor() {}

    getProducts({ tags }) {
        return Promise.resolve(productsMock);
    }

    getProduct({ id }) {
        return Promise.resolve(productsMock[0]);
    }

    createProduct({ product }) {
        return Promise.resolve(productsMock[0]);
    }

    updateProduct({ id, product }) {
        return Promise.resolve(productsMock[0]);
    }

    deleteProduct({ id }) {
        return Promise.resolve(productsMock[0]);
    }
}

module.exports = ProductsService;