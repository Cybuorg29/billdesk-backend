const mongoose = require('mongoose')

const ExpencesSchema = new mongoose.Schema({
    title:{type:String,require:true},
    category:{type:String,require:true},
    amount:{type:Number,require:true},
    provisionAmt:[],
    id:{type:String,require:true},
    date:{type:String,require:true}
})


const expencesModel = mongoose.model('expences',ExpencesSchema)

module.exports = expencesModel;