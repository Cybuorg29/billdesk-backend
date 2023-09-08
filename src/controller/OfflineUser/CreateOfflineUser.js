exports.addOfflienClient=async(req,res)=>{
    try{

    }catch(err){
         res.status(200).json({code:500,message:'an error occured please try again',error:err.message})
    }
}