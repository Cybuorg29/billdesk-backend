const mongoose = require('mongoose')

const ProductSchema  =  new  mongoose.Schema({
 
    name:{type:String,require:true},
    tax:[],
    description:{type:String,require:true},
    code:{type:String,require:true},
    id:{type:String},
    image:{type:String},
    rate:{type:Number,require:true},
    category:{type:String},
    limit:{type:Number,require:true},
    stock:{type:Number,require:true}

},{
    timestamps:true
})


const productModel = mongoose.model('product',ProductSchema)

module.exports = productModel;