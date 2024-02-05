
const express = require('express')
const { signup, login, verify, claim } = require('../controller/user')
const { getUserDataByToken } = require('../controller/profile')
const UserModel = require('../model/userModel')
const profileModel = require('../model/ProfileModel')
const bankModel = require('../model/BankModel')
const expencesModel = require('../model/ExpencesModel')
const incomeModel = require('../model/IncomeModel')
const fs = require('fs')

const router = express.Router()


router.post(`/user/signup`, signup)   //sign up user 
router.post(`/user/login`, login)  //search by username name and  compared hashed password and then return token 
router.get(`/user/getdata/:token`, getUserDataByToken)  // get user data 
router.get(`/user/verify/:token`, verify);  //verifies user login 
router.post(`/user/claim/profile`, claim)

router.get('/change/route/user', async (req, res) => {
    try {

        const data = await UserModel.find({}).lean();

        // const update = await USERModel.insertMany(data);
        // .lean() is used to get plain JavaScript objects instead of Mongoose documents

        // Convert data to JSON string
        const jsonData = JSON.stringify(data, null, 2);

        // Write data to a local file
        fs.writeFileSync('data.json', jsonData);
        res.status(200).json({ message: jsonData })
    } catch (err) {
        console.log(err.message)
        return res.json({ message: err.message })
    }

})

module.exports = router