const productsMock = require('../utils/mocks/products');
const MongoLib = require('../lib/mongo');

class ProductsService {
    constructor() {
        this.collection = 'products';
        this.mongoDB = new MongoLib();
    }

    async getProducts({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const products = await this.mongoDB.getAll(this.collection, query);

        return products || [];
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

    patchProduct({ id, product }) {
        return Promise.resolve(productsMock[0]);
    }

    deleteProduct({ id }) {
        return Promise.resolve(productsMock[0]);
    }
}

module.exports = ProductsService;