const bankModel = require("../model/BankModel");
const profileModel = require("../model/Profile");
const UserModel = require("../model/userModel");

exports.getUserDataByToken=async(req,res)=>{
    try{
       const {token} = req.params;
       
        const id = await UserModel.convertToken(token)
         console.log(id)  
          const  user = await profileModel.findOne({id:id})
          if(!user){
            return res.status(200).json({code:100,message:'please set up your profile'})
          }
           const bank = await bankModel.findOne({id:id})
          return res.status(200).json({code:200,message:'data fetched sucessfully',user:user,bank:bank})
  
    }catch(err){
       console.log(err.message)
      return res.status(200).json({code:500,message:err.message})
    }
  
  }

  exports.setupProfile=async(req,res)=>{
     try{
        console.log(req.body)
        // const image = req?.file?.path;
        // console.log('image',image)
       const {user,bankDetail,token} = req.body;
       if(!user||!bankDetail||!token){
         throw new Error('invalid form')
       }
       const {name,gstin,phone,email,building,city,district,state,activities,pincode} = user
       const {Accountname,no,isfc,bankName,branch} = bankDetail
       console.log(name,gstin,phone,email,building,city,district,state,activities,pincode,Accountname,no,isfc,bankName,branch)
       if(!name||!gstin||!phone||!email||!building||!city||!district||!state||!activities||!pincode||!Accountname||!no||!isfc||!bankName||!branch) 
       {
         return res.status(200).json({code:400,message:'form not full filled'})
        }
        console.log(image)
        
        //   const id = await UserModel.convertToken(token);
    //  const updateProfile = await profileModel.findOneAndUpdate({id:id},{$set:{name:name,gstin:gstin,phone:phone,building:building,city:city,district:district,email:email,image:image,state:state,pincode:pincode,activities:activities}})
    //  const updateBank = await bankModel.findOneAndUpdate({id:id},{$set:{name:Accountname,no:no,isfc:isfc,bank:bankName,branch:branch}})
  }catch(err){
    return res.status(200).json({code:500,message:err.message})
  }
    
    

  }

  exports.uploadSetUpImage=(req,res)=>{
    try{
      console.log(req.file?.path)
      return req?.file?.path
    }catch(err){
      console.log(err.message)
      return res.json(err.message)
    }
  }