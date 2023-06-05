const express = require('express')
const { register, login, verify, getUserName } = require('../controller/userController')

const router = express.Router()

router.post('/user/register',register)
router.post('/user/login',login)
router.get('/user/verify/:token',verify)
router.get('/user/getname/:token',getUserName)



module.exports = router