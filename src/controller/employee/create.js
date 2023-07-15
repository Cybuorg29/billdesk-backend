const employeeModel = require("../../model/employeeModel");
const UserModel = require("../../model/userModel");
const { convertToken } = require("../../utils/convertToId");

exports.createEmployee=async(req,res)=>{

    
    try{
           console.log(req.file?.path)
          console.log(req.body)
        const { data, token } = req.body;
         if(!data||!token){

             return res.status(200).json({ code: 400, message: 'an error occured please try again ' })
            }
            const { name, adress, salary, balance,type,phone } = data
            if (!name || !adress || !salary || !balance  || !token||!phone) {
                return res.status(200).json({ code: 400, message: 'form not fully filled ' })
            }
            const id =  await UserModel.convertToken(token);
            const image = req?.file?.path;
            if(!image){
                     return res.status(200).json({ code: 400, message: 'an error occured please try adding image' })
                    
                 }
                 console.log('iamge',image)
            const uploadEmployee = await employeeModel.create({ name, adress, salary, balance, image ,id,type,phone});
            uploadEmployee.save();
            return res.status(200).json({ code: 200, message:'Employee added sucessfully',data:uploadEmployee})

    }catch(err){
        return res.status(200).json({code:500 ,message:'en error occured',description:err.message})
    }
    
}