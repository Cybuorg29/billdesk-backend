
const express = require('express')
const { signup, login } = require('../controller/user')
const { getUserDataByToken } = require('../controller/profile')

const router = express.Router()


router.post(`/user/signup`,signup)   //sign up user 
router.post(`/user/login`,login)  //search by username name and  compared hashed password and then return token 
router.get(`/user/getdata/:token`,getUserDataByToken)  // get user data 

module.exports = router