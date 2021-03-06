const express = require('express');
const router = express.Router();

const { createCategoryGet, listCategoryGet, createCategoryPost, detailCategoryGet } = require('../../controllers/product.controller/category.controller');

//list category
router.get('/product/category/list', listCategoryGet);

//form category
router.get('/product/category/create', createCategoryGet);

router.post('/product/category/create', createCategoryPost);


router.get('/product/category/:id', detailCategoryGet);


module.exports = router;