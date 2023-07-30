
const express = require('express')
const { signup, login } = require('../controller/user')
const { getUserDataByToken } = require('../controller/profile')
const UserModel = require('../model/userModel')
const profileModel = require('../model/ProfileModel')
const bankModel = require('../model/BankModel')
const expencesModel = require('../model/ExpencesModel')
const incomeModel = require('../model/IncomeModel')

const router = express.Router()


router.post(`/user/signup`,signup)   //sign up user 
router.post(`/user/login`,login)  //search by username name and  compared hashed password and then return token 
router.get(`/user/getdata/:token`,getUserDataByToken)  // get user data 

router.get('/user/date',async(req,res)=>{
    try{

        const d = new Date()
         const id = '64855890e6a6dcc2c770024a'
        let  day = (d.getDate() - d.getDate() ) +1
        const greaterMonth = String(d.getMonth() + 1).padStart(2, '0');
        const Lessmonth = String(d.getMonth() + 0 ).padStart(2, '0');
        let year = d.getFullYear()
        var twoDigitYear = year.toString().substr(-2);
        // const date = `${day}-${month}-${twoDigitYear}`
         const  greater = `${day}-${Lessmonth}-${twoDigitYear}`
         const less = `${day}-${greaterMonth}-${twoDigitYear}`
          console.log(greater,less)
        const data = await  expencesModel.find({id:id})
         const newArray = [];
         data.map((index)=>{
            const d = index.date.split('-')
             const day = d[0];
             const month = d[1];
              const year = d[2];
              if(twoDigitYear===year){
                 console.log('year')
                if(greaterMonth<=month){
                    console.log('month')
                    if(Lessmonth<=less){
                        console.log('index')
                        newArray.push(index)
                    }
                }
              }
         })
        return res.json({message:newArray})
    }catch(err){
        console.log(err.message)
        return res.json({message:err.message})
    }
})

module.exports = router