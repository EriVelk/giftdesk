const express = require('express');
const router = express.Router();

const { listGet, createListUser } = require('../../controllers/product.controller/list.controller');

router.get('/product/user/list', listGet);

router.post('/product/cart', createListUser);

module.exports = router;