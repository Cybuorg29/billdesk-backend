const profileModel = require("../../model/ProfileModel");
const connectionModel = require("../../model/connectionModel");
const UserModel = require("../../model/userModel");

exports.handleRequest=async(req,res)=>{

    try{
        
        const {_id,id,type} = req.body;
        if(!_id,!id,!type){
             return res.status(200).json({code:400,message:'an error occured please try again',error:'incomplete info'});
        } 
        const Connections = await connectionModel.find({ $or: [{ cid: _id }, { sid: _id }] });
        if(Connections&&Connections.type===type){
            return res.status(200).json({code:400,message:'Already Connected to the user',error:'Connection Already Exists'});
        }
        
        const userExists = await profileModel.findOne({_id:id});
         console.log(userExists)
        if(!userExists){
            return res.status(200).json({code:400,message:'Cannot Send Request to the user please try again',error:'Cannot find user'});
        }       
        let  sid = '';
        let cid = '';
        let t = 0;
         console.log('asdasda')
       if(type===0){
         sid = _id;
         cid = id
        
        }else{
          cid = _id
         sid = id;
         t=1;
       }
         console.log('conn')
       const createConnection = await connectionModel.create({cid:cid,sid:sid,status:false,type:t});
       return res.status(200).json({code:200,message:"request send Sucessfully waiting for the user to accept the request"});
    }catch(err){
        console.log(err.message);
        return res.status(200).json({code:500,message:'an error occured please try again',error:err.message})
    }
    
    
}
