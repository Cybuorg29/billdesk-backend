 const OfflineUserModel = require('../../model/OfflineUser');
  const convertToken = require('../../utils/convertToId')
  const connectionModel = require('../../model/connectionModel');
const bankModel = require('../../model/BankModel');
const UserModel = require('../../model/userModel');
const profileModel = require('../../model/ProfileModel');
exports.addOfflienClient=async(req,res)=>{
    try{

         const {generalInfo,bankInfo,token} = req.body;
         const {    name,
         gstin,
         phone,
         email,
         building,
         city,
         district,
         state,
         activities,
         pincode,
          } = generalInfo;
         const {Accountname,no,isfc,bankName,branch} = bankInfo;

         if(!    name,!gstin,!phone,!email,!building,!city,!district,!state,!activities,!pincode,!token) res.status(200).json({code:400,message:'incomplete data to perform the action'});
             const validateFromOnlineUser = await  UserModel.findOne({gstin:gstin});
             if(validateFromOnlineUser) return res.status(200).json({code:200,message:'user already exists',error:validateFromOnlineUser._id});
             const validateFromOffileUser =  await OfflineUserModel.findOne({gstin:gstin});
                const _id =   UserModel.convertToken(token);
                let t =''
             if(validateFromOffileUser)  {
               let pkg;
                  if(type===0){
                       pkg = await createConnection(validateFromOffileUser._id,_id);
                      t='Supplier';
                    }else{
                       pkg =  await createConnection(_id,validateFromOffileUser._id);
                       t = 'Client';
                  }
                  if(!pkg.code){
                    return res.status(200).json({code:500,message:pkg.package,error:pkg?.error});
                  }else{
                    return res.status(200).json({code:400,message:`${t}added`,package:pkg});
                      
                  }
                }

                const createOfflienBusniess = await profileModel.create({ name,
                  gstin,
                  phone,
                  email,
                  building,
                  city,
                  district,
                  state,
                  activities,
                  pincode,
                  type:false,token})
                  createOfflienBusniess.save();
         const CreateBank = await bankModel.create({name:Accountname,no:no,isfc:isfc,bank:bankName,branch:branch})
             CreateBank.save()
                  if(!createOfflienBusniess&&!updateBank) return res.status(200).json({code:400,message:'an error occured please try again',error:'cannot crete offline buinsess profile'})
                   return res.status(200).json({code:200,message:`${t}added sucessfully`,package:{createOfflienBusniess,CreateBank}});
    }
    catch(err){
         console.log(err.message);
         return  res.status(200).json({code:500,message:'an error occured please try again',error:err.message})
    }
}


 async  function  createConnection(sid,cid,type){
  try{
    const  create =  await connectionModel.create({
      sid:sid,
      cid:cid,
      status:0
    })   
    create.save();
    return ({package:create,code:0})
  }catch(err){
    return ({package:'an error occured please try again ',code:1,error:err.message});
  }
}
