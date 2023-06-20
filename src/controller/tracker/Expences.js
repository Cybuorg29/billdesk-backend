const expencesModel = require("../../model/ExpencesModel");
const UserModel = require("../../model/userModel");

exports.createExpence=async(req,res)=>{
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
          const year = d.getFullYear()
        var twoDigitYear = year.toString().substr(-2);
        const date = `${day}-${month}-${twoDigitYear}`
     const pushExpences = await expencesModel.create({title,amount,category,id,date:date})
     if(!pushExpences) throw new Error("an error occured")  
      return res.status(200).json({code:200,message:'Expence Added Sucessfully',expence:pushExpences})
    }catch(err){
        console.log(err)
        return res.status(200).json({code:500,message:'an error occured. please try again'})
    }
     
}

exports.getExpences=async(req,res)=>{
    try{
        const {token} = req.body;
        if(!token){
            return res.status(200).json({code:400,message:'an error occured on user side please try again'})
        }
        const id = await UserModel.convertToken(token)
        if(!id){
             return res.status(200).json({code:400,message:'an error occured on user side please try again'})
            }
            const expences = await expencesModel.find({id:id})
            if(!expences){
                return res.status(200).json({code:200,message:'No expences registered please add '})
            }
            return res.status(200).json({code:200,expences:expences})
         
         

    }catch(err){
        console.log(err.message)
        return res.status(200).json({code:500,message:'an error occured'})
    }
}