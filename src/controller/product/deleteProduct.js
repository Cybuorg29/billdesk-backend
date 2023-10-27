const productModel = require("../../model/ProductModel");
const UserModel = require("../../model/userModel");

exports.deleteProduct=async(req,res)=>{

    try{

    
    const {token,_id} = req.params;
    if(!token||!_id){
        return res.status(200).json({code:400,message:"an error occured please try again "});

    }
    const  id = await UserModel.convertToken(token);
     const deleteProduct = await productModel.findOneAndDelete({_id:_id,id:id})
     return res.status(200).json({code:200,message:'product deleted sucessfully '})
}catch(err){
    return res.status(500).json({code:500,message:'an error occured ',error:err.message})
}
}