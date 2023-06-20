const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken')
  const dotenv = require('dotenv');
const profileModel = require("../model/ProfileModel");
const bankModel = require("../model/BankModel");
  dotenv.config()
 const secret = process.env.SECRET_KEY


exports.signup=async(req,res)=>{
    try{
         console.log('dignyup')
          const {user} = req.body //get data from frontend
         const {name,password,username,email,phone} = user;
           console.log(name,password,username,email,phone)
          if(!name||!password||!username||!email||!phone){  // data validation
            return res.status(200).json({code:400,message:'please fully fill the form '})
          }
           const userExistsbyPhone = await UserModel.findOne({phone:phone}) //searching user with phone number
           if(userExistsbyPhone){
            return res.status(200).json({message:'user already registered with  this mobile number please login or choose a different phone number '})
           }
        
           const userExistsbyEmail = await UserModel.findOne({email:email}) //searching user with email
           if(userExistsbyEmail){
            return  res.status(200).json({code:400,message:'user already registered wirh this email please login or choose a different email'})
           }
            console.log(password)
             const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
             console.log(hashedPassword)
           const pushUser = await UserModel.create({name,password:hashedPassword,username,email,phone}) //creating new user
           pushUser.save()
           const pushProfile = await profileModel.create({id:pushUser._id,name:'',gstin:'',phone:'',email:'',building:'',city:'',district:'',image:'',pincode:'',state:''})
           pushProfile.save()
            const pushBankDetails = await bankModel.create({no:'',branch:'',isfc:'',name:'',bank:'',id:pushUser._id})
            pushBankDetails.save()
           return res.status(200).json({code:200,message:'Registered sucessfully'})

        

     }catch(err){
        console.log(err.message)
        return res.status(200).json({message:err.message})
     }

}

exports.login=async(req,res)=>{
    try{

        const {username,password} = req.body;
         console.log(username,password)
        if(!username||!password){
            return res.status(200).json({code:400,message:'please enter all the credentials'})
        }
        
    //    const token = await UserModel.login(username,password)
         const  isUser = await UserModel.findOne({username:username})
          if(!isUser){
            throw new Error('no user found')
          }
          const  passwordCheck = await  bcrypt.compare(password,isUser.password)
          console.log(passwordCheck)
          if(!passwordCheck){
            throw new Error('incorrect password')
          }
          //is password is correct create a auth token for the  user
          const id = isUser._id
          const token = jwt.sign({id},secret)
        //   console.log(token)
       return res.status(200).json({code:200,message:'logined sucessfully',token:token})



    }catch(err){
        console.log(err.message)
         return res.status(200).json({code:500,message:err.message})
    }
     

}

