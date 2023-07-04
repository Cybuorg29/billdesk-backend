const incomeModel = require("../../model/IncomeModel");
const UserModel = require("../../model/userModel");

exports.createIncome=async(req,res)=>{
    try{

            const {title,amount,category,token} = req.body;
            if(!title||!amount||!category||!token){
        return res.status(200).json({code:400,message:"please fill the info"})
     }
      const id = await UserModel.convertToken(token)
       if(!id){
         throw new Error('user not found')
       }
       const d = new Date()
       const day = d.getDate()
       const month = String(d.getMonth() + 1).padStart(2, '0');
       let  year = d.getFullYear()
       var twoDigitYear = year.toString().substr(-2);
        const date = `${day}-${month}-${twoDigitYear}`
     const pushIncome = await incomeModel.create({title,amount,category,id,date:date})
     if(!pushIncome) throw new Error("an error occured")  
      return res.status(200).json({code:200,message:'Income Added Sucessfully',income:pushIncome})
        
    }catch(err){
        console.log(err.message)
        return res.status(200).json({code:500,message:'an error occured'})
    }
}

exports.getIncome=async(req,res)=>{
  try{

    const {token} = req.params;
    if(!token){
      return res.status(200).json({code:400,message:'an error occured '})
    }
    const id = await UserModel.convertToken(token)
    if(!id){
      throw new Error('user not found')
    }
    const income = await incomeModel.find({id:id})
    return res.status(200).json({code:200,message:'opertaion completed sucessfully',income:income})
  }catch(err){
    console.log(err.message)
    return res.status(200).json({code:500,message:err.message})
  }

}