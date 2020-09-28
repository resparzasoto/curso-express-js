const express = require('express');
const router = express.Router();

const ProductsService = require('../../services/products');
const productService = new ProductsService();

const validation = require('../../utils/middleware/validationHandler')

const {
    productIdSchema,
    productTagSchema,
    createProductSchema,
    updateProductSchema
} = require('../../utils/schemas/products')

router.get('/', list);
router.get('/:id', get);
router.post('/', validation(createProductSchema), insert);
router.put('/:id', validation({ productId: productIdSchema }, 'params'), validation(updateProductSchema), update);
router.patch('/:id', patch);
router.delete('/:id', remove);

async function list(req, res, next) {
    const { tags } = req.query;
    console.log('tags', tags);

    try {
        // throw new Error('This is a error from API');
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
    const { body: data } = req;

    try {
        const createdProduct = await productService.createProduct({ data })

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
    const { body: data } = req;

    try {
        const updatedProduct = await productService.updateProduct({ id, data });

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
    const { body: data } = req;
    console.log('id', id);
    console.log('data', data);

    try {
        const patchedProduct = await productService.patchProduct({ id, data });

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
