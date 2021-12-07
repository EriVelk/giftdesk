const express = require('express');
const router = express.Router();

const { indexControllerGet} = require('../../controllers/index.controller/index.controller');

router.get('/', indexControllerGet);

module.exports = router;