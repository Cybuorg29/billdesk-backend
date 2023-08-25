const { token } = require("morgan");
const UserModel = require("../../model/userModel");
const productModel = require("../../model/ProductModel");
const expencesModel = require("../../model/ExpencesModel");

exports.updateProductData=async(req,res)=>{

}

exports.addStock=async(req,res)=>{
    try{
         console.log(req.body)
         const {value,price,total,token,_id,date} = req.body;
          if(!value||!price||!total||!_id) return res.status(200).json({code:404,message:'Incomplete Data to perform the action',error:''});
          
          const id = await UserModel.convertToken(token);
           const Product = await productModel.findOne({_id:_id,id:id});
            if(!Product)  return res.status(200).json({code:404,message:'an error occured',error:''});
            const updateStockAndPrice = await productModel.findOneAndUpdate({_id:_id,id:id},{$set:{rate:price,stock:parseFloat(Product.stock + parseFloat(value))}});
            const pushExpences = await expencesModel.create({ title:`Goods Purchased`, amount:total, category:200, id, date:date,uid:Product._id })
            console.log(pushExpences)
            if (!pushExpences) throw new Error("an error occured")
            return res.status(200).json({ code: 200, message: 'Stock updates sucessfully', package: pushExpences });



    }catch(err){
        console.log(err.message)
        return res.status(200).json({code:500,message:'an error occured',error:err.message})
    }
}