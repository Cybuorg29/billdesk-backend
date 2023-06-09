
const express = require('express')
const UserModel = require('../model/user/userModel')
const UserDetailModel = require('../model/user/userDetailModel')
const offlineClientModel = require('../model/client/clientModel')
exports.register =async(req,res)=>{
    try{
      console.log('register')
      
        const {name,gstin,phone,email,building,landmark,district,pincode,state,activities,username,password,adress,inNo} = req.body
            
           if(!username||!password ||!name ||!gstin ||!phone ||!email ||!building ||!landmark ||!district ||!pincode ||!state||!activities){
               console.log('asdasd')
             return res.status(200).json({Code:402,message:"form not fully filled"})
             
           }
                 const createUser =  await UserModel.create({username,password})
                 createUser.save()
                  const {_id} = createUser;
                  console.log('adding user details')
                 const createUserDetail = await UserDetailModel.create({
                    name,gstin,phone,email,building,landmark,district,pincode,state,activities,adress,id:_id

                 })
                  createUserDetail.save()
                   console.log(createUser,createUserDetail)
                 console.log(createUser)
                 return res.status(200).json({message:'asdasda'})               
        

    }catch(err){
        return res.status(500).json({ code:500, message:err.message})

    }
}

exports.login = async (req,res)=>{
    console.log('login')
  
    try {
         const {username,password} = req.body;
         if(!username||!password){
              console.log(username,password)
            return res.status(200).json({code:402,message:"Credentials Incomplete"})
          }else{
            const   token = await UserModel.login(username,password)
             console.log(token)
             
            return res.status(200).json({code:200,token:token})              
        }          
      
      } catch (err) {
        console.log(err.message)
        res.status(200).json({code:500, message:err.message });
      }
  
  
  
  }


  exports.verify=async(req,res)=>{
    try{
       console.log('verify')
      
      const {token} = req.params;
       console.log('token',token)
      if(!token){
        return res.status(200).json({code:404,message:'Please login to continue'})
      }
      const  data = await UserModel.convertToken(token)
      console.log(data.id)
      const isUser = await UserModel.findOne({_id:data.id})
         console.log('isUser',isUser)
      if(!isUser){
        return res.status(200).json({code:401,message:'session expired please login again'})
        
      }else{

        return res.status(200).json({code:200,message:'sucessfull'})
        
      }
    }catch(err){
       console.log(err.message)
      return res.status(200).json({code:501,message:err.message})
      
    }

  }
  


  exports.getUserName=async(req,res)=>{
      try{
             const {token }  = req.params
              console.log(token)
             const data = await UserModel.convertToken(token)
             console.log(data)
              if(!data){
                 
                return res.status(200).json({code:400,message:"Session Expires Please Login again"})
              }else{

                  console.log('data',data)
                const id = data.id;
                 console.log(id)
                              const  user = await UserDetailModel.findOne({id:id})
                 console.log('user1',user)
                 const name = user.name
                if(!name){  
                   console.log(`!name`)
                  return res.status(200).json({code:400,message:'no user found please login again '})
                }
                
                
                return res.status(200).json({code:200,name:name})
              }

      }catch(err){
        console.log(err.message)
        // return res.json(200).json({code:500,message:err.message})
      }
  }


  exports.getUser=async(req,res)=>{
     try{
       console.log('getUser')
       const {token} = req.params
        if(!token){
          return res.status(200).json({code:400,message:'an error occured'})
        }
       const  user = await UserDetailModel.findOne({_id:token})
        console.log(user)
        //     console.log('user',user)
        // if(user!='null'){
        //     console.log('!null')
        //   return res.status(200).json({code:200,user:user})
        // }
        // if(offlineUser!='null'){
        //    console.log('offline')

        //   return res.status(200).json({code:200,user:offlineUser})
          
        // }

        // return res.status(200).json({code:400,message:'an error occured'})
        if(!user){
           console.log('userNull')
         const offlineUser = await offlineClientModel.findOne({_id:token});
          console.log(offlineUser)
          if(!offlineUser){
            return res.status(200).json({code:400,message:'user not found'})
          }else{
             console.log('offlineClient',offlineUser)
            return res.status(200).json({code:200,user:offlineUser})

          }
          

        }
        console.log('user')
        return res.status(200).json({code:200,data:user})


     }catch(err){
      console.log(err.message)
      return res.status(200).json({code:500,message:err.message})
     }

  }


