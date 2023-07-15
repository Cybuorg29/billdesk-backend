const express = require('express')
const { createEmployee } = require('../controller/employee/create');
const { getEmployee } = require('../controller/employee/get');
const router = express.Router()
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')


cloudinary.config({
    cloud_name: "dcnu7ucih",
    api_key: "715421924649762",
    api_secret: "fih7IsE57u1mTDWqpwCg9VsFhyM"
})



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'employee',
    },
});

const upload = multer({ storage: storage })
router.post('/create/employee',upload.single('image'),createEmployee);
router.get('/get/employee/:token',getEmployee)


module.exports = router;