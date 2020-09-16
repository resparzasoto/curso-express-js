const express = require('express');
const router = express.Router();

const ProductsService = require('../../services/products');
const productService = new ProductsService();

router.get('/', list);
router.get('/:id', get);
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove);

async function list(req, res, next) {
    const { tags } = req.query;

    try {
        const products = await productService.getProduct({ tags });

        res.status(200).json({
            data: products,
            message: 'products listed',
        });
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    const { id } = req.params;

    try {
        const product = await productService.getProduct({ id });

        res.status(200).json({
            data: product,
            message: 'product retrieved',
        });
    } catch (error) {
        next(error);
    }
}

async function insert(req, res, next) {
    const { body } = req;

    try {
        const product = await productService.createProduct({ body })

        res.status(201).json({
            data: product,
            message: 'product created',
        });
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    const { id } = req.params;
    const { body } = req;

    try {
        const product = await productService.updateProduct({ id, body });

        res.status(200).json({
            data: product,
            message: 'product updated',
        });
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    const { id } = req.params;

    try {
        const product = await productService.deleteProduct({ id });

        res.status(200).json({
            data: product,
            message: 'product deleted',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = router;
