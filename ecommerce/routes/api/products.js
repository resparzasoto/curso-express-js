const express = require('express');
const router = express.Router();

const ProductsService = require('../../services/products');
const productService = new ProductsService();

router.get('/', list);
router.get('/:id', get);
router.post('/', insert);
router.put('/:id', update);
router.patch('/:id', patch);
router.delete('/:id', remove);

async function list(req, res, next) {
    const { tags } = req.query;
    console.log('tags', tags);

    try {
        const listedProducts = await productService.getProducts({ tags });

        res.status(200).send({
            data: listedProducts,
            message: 'products listed',
        });
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    const { id } = req.params;
    console.log('id', id);

    try {
        const retrievedProduct = await productService.getProduct({ id });

        res.status(200).send({
            data: retrievedProduct,
            message: 'product retrieved',
        });
    } catch (error) {
        next(error);
    }
}

async function insert(req, res, next) {
    const { body } = req;
    console.log('body', body);

    try {
        const createdProduct = await productService.createProduct({ body })

        res.status(201).send({
            data: createdProduct,
            message: 'product created',
        });
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    const { id } = req.params;
    const { body } = req;
    console.log('id', id);
    console.log('body', body);

    try {
        const updatedProduct = await productService.updateProduct({ id, body });

        res.status(200).send({
            data: updatedProduct,
            message: 'product updated',
        });
    } catch (error) {
        next(error);
    }
}

async function patch(req, res, next) {
    const { id } = req.params;
    const { body } = req;
    console.log('id', id);
    console.log('body', body);

    try {
        const patchedProduct = await productService.patchProduct({ id, body });

        res.status(200).send({
            data: patchedProduct,
            message: 'product patched',
        });
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    const { id } = req.params;
    console.log('id', id);

    try {
        const deletedProduct = await productService.deleteProduct({ id });

        res.status(200).send({
            data: deletedProduct,
            message: 'product deleted',
        });
    } catch (error) {
        next(error);
    }
}

module.exports = router;
