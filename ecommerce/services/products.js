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

    async getProduct({ id }) {
        const product = await this.mongoDB.get(this.collection, id);
        return product || {};
    }

    async createProduct({ data }) {
        const createProductId = await this.mongoDB.create(this.collection, data);
        return createProductId;
    }

    async updateProduct({ id, data }) {
        const updateProductId = await this.mongoDB.update(this.collection, id, data);
        return updateProductId;
    }

    async patchProduct({ id, data }) {
        return Promise.resolve(productsMock[0]);
    }

    async deleteProduct({ id }) {
        const deleteProductId = await this.mongoDB.delete(this.collection, id);
        return deleteProductId;
    }
}

module.exports = ProductsService;