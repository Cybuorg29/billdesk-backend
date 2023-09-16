const express = require('express')
const app = express()
const router = express.Router()
const cloudinary  = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')
const { setupProfile, uploadImage, uploadSetUpImage, getProfileData, searchUser } = require('../controller/profile')

cloudinary.config({
    cloud_name: "dcnu7ucih",
    api_key: "715421924649762",
    api_secret: "fih7IsE57u1mTDWqpwCg9VsFhyM"
  })
  
  
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'profile',
    },
  });
  const upload = multer({ storage: storage })
 
  router.post('/profile/setup',upload.single('file'),setupProfile);
  router.post('/profile/update/photo',upload.single('image'),uploadSetUpImage);
  router.get(`/get/profile/:id`,getProfileData);
  router.get(`/search/user/:token`,searchUser);

module.exports = router