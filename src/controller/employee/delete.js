const employeeModel = require("../../model/employeeModel");
const UserModel = require("../../model/userModel");

exports.deleteEmployee=async(req,res)=>{
      try {
            const {id,token} = req.params;
             if(!id||!token) return res.status(200).json({code:400,message:'an error occured please try again '});

             const uid = await UserModel.convertToken(token)
             const deleteEmployee = await employeeModel.findOneAndUpdate({_id:id,id:uid},{$set:{id:''}})
               if(!deleteEmployee) return res.status(200).json({code:404,message:'an error occured please try again'})
               return res.status(200).json({code:200,message:'Employee deleted sucessfully'})
      }catch(err){
            return res.status(200).json({code:500,message:'an error occured',error:err.message})
      }      
}