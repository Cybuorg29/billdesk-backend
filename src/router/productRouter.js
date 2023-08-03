const express = require('express');
const { createProduct } = require('../controller/product/createProduct');
const { deleteProduct } = require('../controller/product/deleteProduct');
const router = express.Router();

router.post("/create/product",createProduct);
router.get('/delete/product/:token/:_id',deleteProduct)


module.exports = router