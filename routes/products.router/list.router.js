const express = require('express');
const router = express.Router();

const { listGet, createListUser, createCartUser, endCartUserGet, listCartUser, endCartUserPost, listConfirmGet,listConfirmPost } = require('../../controllers/product.controller/list.controller');

router.get('/product/user/list', listGet);

//confirm list
router.get('/product/list/end', listConfirmGet)
router.post('/product/list/end', listConfirmPost)

router.get('/product/user/cart', listCartUser);

router.post('/product/list', createListUser);

router.post('/product/cart', createCartUser);

router.get('/product/cart/end', endCartUserGet);

router.post('/product/cart/end', endCartUserPost);

module.exports = router;