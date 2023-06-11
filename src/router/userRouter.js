
const express = require('express')
const { signup, login } = require('../controller/user')
const { getUserDataByToken } = require('../controller/profile')

const router = express.Router()


router.post(`/user/signup`,signup)
router.post(`/user/login`,login)
router.get(`/user/getdata/:token`,getUserDataByToken)

module.exports = router