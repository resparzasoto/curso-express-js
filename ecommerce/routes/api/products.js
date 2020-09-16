const express = require('express');
const router = express.Router();

const productsMock = require('../../utils/mocks/products');

router.get('/', list);
router.get('/:id', get);
router.post('/', insert)
router.put('/:id', update)
router.delete('/:id', remove);

function list(req, res, next) {
    const { tags } = req.query;

    res.status(200).json({
        data: productsMock,
        message: 'products listed',
    });
}

function get(req, res, next) {
    const { id } = req.params;

    res.status(200).json({
        data: productsMock[0],
        message: 'product retrieved',
    });
}

function insert(req, res, next) {
    res.status(201).json({
        data: productsMock[0],
        message: 'product created',
    });
}

function update(req, res, next) {
    res.status(200).json({
        data: productsMock[0],
        message: 'product updated',
    });
}

function remove(req, res, next) {
    const { id } = req.params;

    res.status(200).json({
        data: productsMock[0],
        message: 'product deleted',
    });
}

module.exports = router;
