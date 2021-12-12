const express = require('express');
const router = express.Router();

const { listGet, createListUser, createCartUser } = require('../../controllers/product.controller/list.controller');

router.get('/product/user/list', listGet);

router.post('/product/list', createListUser);

router.post('/product/cart', createCartUser)

module.exports = router;