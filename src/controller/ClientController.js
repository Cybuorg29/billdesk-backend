const offlineClientModel = require("../model/client/clientModel");
const connectionModel = require("../model/connections/connectionModel");
const UserDetailModel = require("../model/user/userDetailModel");
const UserModel = require("../model/user/userModel");



exports.AddClient=async(req,res)=>{
    try{
        //  console.log('add clients')
        //  const {client,token} = req.body;
        //  const data = await UserModel.convertToken(token)
        //   console.log(data)
        //   if(!data||data===undefined||data===null){
        //     return res.status(200).json({code:404,message:'An error occured please refresh or login again '})
        //   }
        //   const {id} = data
        //   console.log(id);
        //  const {name,gstin,adress,district,state,pincode,landmark,activities,building,transport,term} = client;
        // if(!name,!gstin,!adress,!district,!state,!pincode,!transport){
        //     return res.status(200).json({code:400,message:'Please full fill the form'});
        // }
        //  console.log('dist',district)
        // const find = await UserDetailModel.findOne({gstin:gstin})
        // if(find){
        //     return res.status(200).json({code:100,message:'Client already exists  on the platform',user:find._id})
        // }
        
        // const pushUser = await offlineClientModel.create({name:name,gstin:gstin,adress:adress,district:district,state:state,pincode:pincode,building:building,landmark:landmark,activities:activities})
        //  pushUser.save()
        // return  res.status(200).json({code:200,message:'Client added Sucessfully'})
         console.log(req.body)
                console.log('add clients')
         const {client,token} = req.body;
         const {name,gstin,adress,district,state,pincode,landmark,activities,building,transport,term} = client;
         if(!name||!gstin||!adress||!district,!state||!pincode||!transport||!activities||!building||!landmark){
             return res.status(200).json({code:400,message:'Please full fill the form'});
         }
         const data = await UserModel.convertToken(token)

          console.log(data)
          if(!data||data===undefined||data===null){
            return res.status(200).json({code:404,message:'An error occured please refresh or login again '})
          }
          const {id} = data;
    
         const userAlreadyExists = await UserDetailModel.findOne({gstin:gstin});
          const userExistsOffline = await offlineClientModel.findOne({gstin:gstin})
          if(userAlreadyExists){
            return res.status(200).json({code:100,message:'user already exists',user:userAlreadyExists._id})
            
        }
        if(userExistsOffline){
              return res.status(200).json({code:100,message:'user already exists',user:userExistsOffline._id})

          }
               const pushUser = await offlineClientModel.create({name:name,gstin:gstin,adress:adress,district:district,state:state,pincode:pincode,building:building,landmark:landmark,activities:activities})
                   pushUser.save()
                   const createConnection = await connectionModel.create({
                     sender:id,
                     receiver:pushUser._id,
                     terms:term,
                     isAproved:true
                                          
                   })
                   createConnection.save()
                   return res.status(200).json({code:200,message:'Client Added Sucessfully'})
    }catch(err){
        console.log(err.message)
        return res.status(200).json({code:500,message:err.message})
    }

} 

exports.getClients=async(req,res)=>{
  try{
    const {token} = req.params;
     const {id} = await UserModel.convertToken(token)
     console.log(id)
      const user = await connectionModel.find({sender:id,isAproved:true})
      console.log(user)
      if(user===[]){
        console.log(user.length)
      }
      return res.status(200).json({code:200,user:user})


  }catch(err){
     return res.status(200).json({code:500,message:err.message})
    console.log(err)
  }
}