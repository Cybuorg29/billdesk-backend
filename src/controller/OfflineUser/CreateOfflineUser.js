const OfflineUserModel = require('../../model/OfflineUser');
const convertToken = require('../../utils/convertToId')
const connectionModel = require('../../model/connectionModel');
const bankModel = require('../../model/BankModel');
const UserModel = require('../../model/userModel');
const profileModel = require('../../model/ProfileModel');
// exports.addOfflienClient=async(req,res)=>{
//     try{

//          const {generalInfo,bankInfo,token} = req.body;
//          const {    name,
//          gstin,
//          phone,
//          email,
//          building,
//          city,
//          district,
//          state,
//          activities,
//          pincode,
//           } = generalInfo;
//          const {Accountname,no,isfc,bankName,branch} = bankInfo;

//          if(!    name,!gstin,!phone,!email,!building,!city,!district,!state,!activities,!pincode,!token) res.status(200).json({code:400,message:'incomplete data to perform the action'});
//              const validateFromOnlineUser = await  UserModel.findOne({gstin:gstin});
//              if(validateFromOnlineUser) return res.status(200).json({code:200,message:'user already exists',error:validateFromOnlineUser._id});
//              const validateFromOffileUser =  await OfflineUserModel.findOne({gstin:gstin});
//                 const _id =   UserModel.convertToken(token);
//                 let t =''
//              if(validateFromOffileUser)  {
//                let pkg;
//                   if(type===0){
//                        pkg = await createConnection(validateFromOffileUser._id,_id);
//                       t='Supplier';
//                     }else{
//                        pkg =  await createConnection(_id,validateFromOffileUser._id);
//                        t = 'Client';
//                   }
//                   if(!pkg.code){
//                     return res.status(200).json({code:500,message:pkg.package,error:pkg?.error});
//                   }else{
//                     return res.status(200).json({code:400,message:`${t}added`,package:pkg});

//                   }
//                 }

//                 const createOfflienBusniess = await profileModel.create({ name,
//                   gstin,
//                   phone,
//                   email,
//                   building,
//                   city,
//                   district,
//                   state,
//                   activities,
//                   pincode,
//                   type:false,token})
//                   createOfflienBusniess.save();
//          const CreateBank = await bankModel.create({name:Accountname,no:no,isfc:isfc,bank:bankName,branch:branch})
//              CreateBank.save()
//                   if(!createOfflienBusniess&&!updateBank) return res.status(200).json({code:400,message:'an error occured please try again',error:'cannot crete offline buinsess profile'})
//                    return res.status(200).json({code:200,message:`${t}added sucessfully`,package:{createOfflienBusniess,CreateBank}});
//     }
//     catch(err){
//          console.log(err.message);
//          return  res.status(200).json({code:500,message:'an error occured please try again',error:err.message})
//     }
// }


//  async  function  createConnection(sid,cid,type){
//   try{
//     const  create =  await connectionModel.create({
//       sid:sid,
//       cid:cid,
//       status:0
//     })   
//     create.save();
//     return ({package:create,code:0})
//   }catch(err){
//     return ({package:'an error occured please try again ',code:1,error:err.message});
//   }
// }


exports.addOfflineClient = async (req, res) => {
  try {

    const { generalInfo, bankInfo, token } = req.body;
    if (!generalInfo || !bankInfo || !token) return res.status(200).json({ code: 300, message: 'incomplete information please try again ' });

    const { name,
      gstin,
      phone,
      email,
      building,
      city,
      district,
      state,
      activities,
      pincode,
      type,
    } = generalInfo;

    const { Accountname, no, isfc, bankName, branch } = bankInfo;
    const _id = await UserModel.convertToken(token);
    const findClient = await profileModel.findOne({gstin:gstin});
    if(findClient) return res.status(200).json({code:400,message:"user already exists on the platform ",error:findClient._id});

     const createUser = await UserModel.create({name:name,email:email,password:Math.random()*100,phone:phone,username:Math.random()*100});
     createUser.save();
     const createProfile = await profileModel.create({name,gstin,phone,email,building,city,district,state,activities,pincode,type,isSetUp:false,id:createUser._id,image:''})
     createProfile.save();
      const CreateBank = await bankModel.create({bank:bankName,branch:branch,id:createUser._id,isfc:isfc,name:name,no:no});
      CreateBank.save();
        console.log('save')
       
        let  sid = '';
        let cid = '';
        let t = 0
         console.log('asdasda')
       if(type===0){
         sid = _id;
         cid = createUser._id
        
        }else{
          cid = _id
         sid = createUser._id;
         t=1;
       }
         console.log('conn')
       const createConnection = await connectionModel.create({cid:cid,sid:sid,status:true,type:t});
           
         return res.status(200).json({code:200,message:'added sucessfully',package:createUser._id})


  } catch (err) {
    console.log(err.message);
    return res.status(200).json({ code: 500, message: 'an error occured please try again', error: err.message })

  }
}