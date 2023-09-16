const productModel = require("../../model/ProductModel");
const UserModel = require("../../model/userModel");



exports.getProducts=async(req,res)=>{

    try{
        console.log('adasda')

        const {token} =req.params;
         if(!token) return res.status(200).json({code:404,message:'No Products  in inventory '})
        const id = await UserModel.convertToken(token);
        const products = await productModel.find({id:id})
        return res.status(200).json({code:200,package:products})
    }catch(err){
        return res.status(200).json({code:200,message:"an error occured ",error:err.message});

        
    }
}

exports.getPublicProducts=async(req,res)=>{
    try{
        console.log('adasda')
        const {id} =req.params;
         console.log('id',id)
         const  user  = await UserModel.findOne({name:id})
          console.log('user',user)
        const products = await productModel.find({id:user._id})
        console.log(products)
        return res.status(200).json({code:200,package:products})
    }catch(err){
          console.log(err.message)
        return res.status(200).json({code:200,message:"an error occured ",error:err.message});

        
    }
}