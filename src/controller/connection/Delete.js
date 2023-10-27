const connectionModel = require("../../model/connectionModel");
const UserModel = require("../../model/userModel");



exports.deleteConnection=async(req,res)=>{
      try{

          const {token,id,role} = req.params;
          const  _id = await  UserModel.convertToken(token);
          const find = await connectionModel.findOneAndDelete({$or:[{sid:_id,cid:id},{cid:_id,sid:id}]})
          if(!find)return res.status(200).json({code:404,message:'an error occured please try again'});
          
          return res.status(200).json({code:200,message:'Deleted Sucessfully'});
        }catch(err){
             console.log(err.message)
             return res.status(200).json({code:500,message:'an error occured',error:err.message});
        }

}