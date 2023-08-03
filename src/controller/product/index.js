const productModel = require("../../model/ProductModel");
const UserModel = require("../../model/userModel");



exports.getProducts=async(req,res)=>{

    try{

        const {token} =req.params;
         if(!token) return res.status(200).json({code:404,message:'No Products  in inventory '})
        const id =  UserModel.convertToken(token);
        const products = await productModel.find({id:id})
        return res.status(200).json({code:200,products:products})
    }catch(err){

        return res.status(200).json({code:200,message:"an error occured ",error:err.message});

        
    }
}