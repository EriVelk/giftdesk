const express = require('express');
const router = express.Router();

const { createProductGet, createProductPost, listProductsGet } = require('../../controllers/product.controller/product.controller');

//list product
router.get('/product/list', listProductsGet);

//form product
router.get('/product/create', createProductGet);

//form product Post
router.post('/product/create', createProductPost);

module.exports = router;