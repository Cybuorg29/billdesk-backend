const employeeModel = require("../../model/employeeModel");
const UserModel = require("../../model/userModel");
const { convertToken } = require("../../utils/convertToId");

exports.createEmployee=async(req,res)=>{

    
    try{
        const { data, token } = req.body;
         if(!data||!token){

             return res.status(200).json({ code: 400, message: 'an error occured please try again ' })
            }
            const { name, adress, salary, balance, image,type,phone } = data
            if (!name || !adress || !salary || !balance || !image || !token||!phone) {
                return res.status(200).json({ code: 400, message: 'form not fully filled ' })
            }
               const id =  await UserModel.convertToken(token);
            const uploadEmployee = await employeeModel.create({ name, adress, salary, balance, image ,id,type,phone});
            uploadEmployee.save();
            return res.status(200).json({ code: 200, message:'Employee added sucessfully'})


        
        
    }catch(err){
        return res.status(200).json({code:err.code,message:'en error occured',description:err.message})
    }
    
}