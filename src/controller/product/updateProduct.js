const { token } = require("morgan");
const UserModel = require("../../model/userModel");
const productModel = require("../../model/ProductModel");
const expencesModel = require("../../model/ExpencesModel");
const { sliceFloat } = require("../../utils/ConvertFloatTo2Digit");

exports.updateProductData = async (req, res) => {

}

exports.addStock = async (req, res) => {
    try {
        console.log(req.body)
        const { value, price, total, token, _id, date, E_id } = req.body;
        if (!value || !price || !total || !_id || !date || !E_id) return res.status(200).json({ code: 404, message: 'Incomplete Data to perform the action', error: '' });

        const id = await UserModel.convertToken(token);
        const Product = await productModel.findOne({ _id: _id, id: id });
        if (!Product) return res.status(200).json({ code: 404, message: 'an error occured', error: '' });
        //    let avgPrice = Product.rate * Product.stock
        //    console.log(avgPrice)
        //    avgPrice =  avgPrice +(price*value);
        //    console.log(avgPrice)
        const totalStock = (parseInt(Product.stock) + parseInt(value))
        console.log(totalStock)
        //        avgPrice = avgPrice/totalStock
        //   console.log(avgPrice)
        //    avgPrice =    sliceFloat(avgPrice);
        const updateStockAndPrice = await productModel.findOneAndUpdate({ _id: _id, id: id }, { $set: { rate: parseFloat(price), stock: parseFloat(Product.stock + parseFloat(value)) } });
        const pushExpences = await expencesModel.create({ title: `${Product.name} Purchased`, amount: total, category: 200, id, date: date, uid: Product._id, E_id: E_id })
        console.log(pushExpences)
        if (!pushExpences) throw new Error("an error occured")
        return res.status(200).json({ code: 200, message: 'Stock updates sucessfully', package: { expence: pushExpences } });



    } catch (err) {
        console.log(err.message)
        return res.status(200).json({ code: 500, message: 'an error occured', error: err.message })
    }
}