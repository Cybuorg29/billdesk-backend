const productModel = require("../../model/ProductModel");
const UserModel = require("../../model/userModel");

exports.createProduct = async(req,res) => {

    try {

        const { token, product } = req.body;
        if (!token) {
            return res.status(200).json({ message: 'an error occured please refresh and and try again ', code: 400 })
        }
     
            if(!product?.name,
               !product?.tax,
               !product?.description,
               !product?.code,
               !product?.rate,
               !product?.category,
               !product?.limit,
               !product?.stock
               ){
                return res.status(200).json({code:400,message:' please fully fill the form '})
               }

               const { name,
                tax,
                description,
                code,
                rate,
                category,limit ,stock } =  product;
                 const image = req?.file.path;

               const id = await UserModel.convertToken(token);

               const validateProduct = await productModel.findOne({id:id,name:name})
                if(validateProduct){
                    return res.status(200).json({code:404,message:"product with the same name already exists"})
                }
               
                const createProduct = await  productModel.create({
            name,
            tax,
            description,
            code,
            image,
            rate,
            category,
            id,
            limit,
            stock
                })

           return res.status(200).json({code:200,message:'product added sucessfully',product:createProduct});




    } catch (err) {
        return res.status(200).json({ message: 'an error occured ', code: 500, error: err.message })
    }





}