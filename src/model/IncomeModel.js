const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    title:{type:String,require:true},
    type:{type:String,require:true},
    amount:{type:Number,require:true},
    id:{type:String,require:true},
    date:{type:String,require:true}
},{
    timestamps:true
})

const incomeModel = mongoose.model('income',incomeSchema)

module.exports = incomeModel