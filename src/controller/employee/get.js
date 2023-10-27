const employeeModel = require("../../model/employeeModel");
const UserModel = require("../../model/userModel");

exports.getEmployee=async(req,res)=>{
  
    try{
        const { token } = req.params;
        if (!token) {
            return res.status(200).json({code:400,messsage:'an error occured refresh and try again '})
        }
        const id = await UserModel.convertToken(token);
         const data = await employeeModel.find({id:id});
          if(!data){
              return res.status(200).json({ code: 404, message: 'please add some employees ' })
            }
            return res.status(200).json({code:200   ,message:data})


    }catch(err){
        return res.status(200).json({code:500,message:err.message})
    }

}