const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
    title:{type:String,require:true},
    category:{type:String,require:true},
    amount:{type:Number,require:true},
    provisionAmt:[],
    id:{type:String,require:true},
    date:{type:String,require:true}
})

const incomeModel = mongoose.model('income',incomeSchema)

module.exports = incomeModel