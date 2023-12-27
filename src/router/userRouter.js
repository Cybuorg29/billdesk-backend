
const express = require('express')
const { signup, login, verify, claim } = require('../controller/user')
const { getUserDataByToken } = require('../controller/profile')
const UserModel = require('../model/userModel')
const profileModel = require('../model/ProfileModel')
const bankModel = require('../model/BankModel')
const expencesModel = require('../model/ExpencesModel')
const incomeModel = require('../model/IncomeModel')

const router = express.Router()


router.post(`/user/signup`, signup)   //sign up user 
router.post(`/user/login`, login)  //search by username name and  compared hashed password and then return token 
router.get(`/user/getdata/:token`, getUserDataByToken)  // get user data 
router.get(`/user/verify/:token`, verify);  //verifies user login 
router.post(`/user/claim/profile`, claim)

module.exports = router