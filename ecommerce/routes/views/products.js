const express = require('express');
const router = express.Router();

const ProductsService = require('../../services/products');
const productsService = new ProductsService();

router.get('/', list);

async function list(req, res, next) {
    const { tags } = req.query;

    try {
        // throw new Error('This is a error');
        const products = await productsService.getProducts({ tags });

        res.render('products', { products });
    } catch (error) {
        next(error);
    }
}

module.exports = router;
