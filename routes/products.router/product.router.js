const express = require('express');
const router = express.Router();

const { createProductGet, createProductPost, listProductsGet, productDetailGet } = require('../../controllers/product.controller/product.controller');

//list product
router.get('/product/list', listProductsGet);

//Detail Product
router.get('/product/:id', productDetailGet);

//form product
router.get('/product/create', createProductGet);

//form product Post
router.post('/product/create', createProductPost);


module.exports = router;