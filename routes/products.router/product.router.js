const express = require('express');
const router = express.Router();

const { createProductGet, listProductsGet } = require('../../controllers/product.controller/product.controller');

//list category
router.get('/product/list', listProductsGet);

//form category
router.get('/product/create', createProductGet);

module.exports = router;