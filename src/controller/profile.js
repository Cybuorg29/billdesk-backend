const bankModel = require("../model/BankModel");
const expencesModel = require("../model/ExpencesModel");
const incomeModel = require("../model/IncomeModel");
const profileModel = require("../model/ProfileModel");
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
        const image = req?.file?.path;
        console.log('image',image)
       const {user,bankDetail,token} = req.body;
       if(!user||!bankDetail||!token){
         throw new Error('invalid form')
       }
       const {name,gstin,phone,email,building,city,district,state,activities,pincode,landmark} = user
       const {Accountname,no,isfc,bankName,branch} = bankDetail
       if(!name||!gstin||!phone||!email||!building||!city||!district||!state||!activities||!pincode||!Accountname||!no||!isfc||!bankName||!branch||!landmark)
       {
         return res.status(200).json({code:400,message:'form not full filled'})
        }
        console.log(image)
        
          const id = await UserModel.convertToken(token);
     const updateProfile = await profileModel.findOneAndUpdate({id:id},{$set:{name:name,gstin:gstin,phone:phone,building:building,city:city,district:district,email:email,image:image,state:state,pincode:pincode,activities:activities,landmark:landmark}})
     const updateBank = await bankModel.findOneAndUpdate({id:id},{$set:{name:Accountname,no:no,isfc:isfc,bank:bankName,branch:branch}})
      return res.status(200).json({code:200,message:'Setup Complete'})
  }catch(err){
    return res.status(200).json({code:500,message:err.message})
  }
    
    

  }

  exports.uploadSetUpImage=async(req,res)=>{
    try{
        const {token} = req.body;
        const image = req?.file?.path;
         console.log(image)
        if(!token||!image){
          throw new Error('an error occured please refresh and try again')
        }
           const id = await UserModel.convertToken(token)
         const updateImage = await profileModel.findOneAndUpdate({id:id},{$set:{image:image}})
          console.log('sucessful')
          return res.status(200).json({code:200,message:'Profile Picture updated Sucessfully',image:updateImage.image})
    }catch(err){
      console.log(err.message)
      return res.status(200).json({code:500,message:err.message})
    }
  }

  exports.getProfileData=async(req,res)=>{
    
    try{
      const {id} = req.params;
      const find = await profileModel.findOne({_id:id});
      if(!find) return res.status(200).json({code:404,message:'user not found'});

      return res.status(200).json({code:200,package:find})
      
    }catch(err){
      console.log(err.message)
      return res.status(200).json({code:500,message:'an error occured please try agian',error:err.message})
    }

  }


  exports.searchUser=async(req,res)=>{
    try{
        const {token} = req.params;
         const searchVariable = new RegExp('.*' + token + '.*')
         const find = await profileModel.find( {$or:[{"name": searchVariable},{"gstin":searchVariable},{'phone':searchVariable}]})
          return  res.status(200).json({code:200,package:find})
    }catch(err){
      console.log(err);
      return res.status(200).json({code:500,message:err.message})
    }
  }
