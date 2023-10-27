const mongoose = require('mongoose')

const BankSchema= new mongoose.Schema({
    name:{type:String,require:true},
    no:{type:String,require:true},
    isfc:{type:String,require:true},
    branch:{type:String,require:true},
    bank:{type:String,require:true},
    id:{type:String,require:true}
    
})

const bankModel = mongoose.model('BankDetails',BankSchema)

module.exports = bankModel