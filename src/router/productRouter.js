const express = require('express');
const { createProduct } = require('../controller/product/createProduct');
const { deleteProduct } = require('../controller/product/deleteProduct');
const router = express.Router();
const cloudinary  = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer');
const { getProducts } = require('../controller/product');

cloudinary.config({
    cloud_name: "dcnu7ucih",
    api_key: "715421924649762",
    api_secret: "fih7IsE57u1mTDWqpwCg9VsFhyM"
  })
  
  
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Product',
    },
  });
  const upload = multer({ storage: storage })


router.post("/create/product",upload.single('image'),createProduct);
router.get('/delete/product/:token/:_id',deleteProduct)
router.get(`/get/products/:token`,getProducts)


module.exports = router