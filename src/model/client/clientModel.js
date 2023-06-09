const mongoose = require('mongoose')

const offlineClientSchema= new mongoose.Schema({
    name:{type:String,require:true},
    gstin:{type:String,require:true},
    phone:{type:String,require:true},
    email:{type:String,require:true},
    building:{type:String,require:true},
    landmark:{type:String,require:true},
    district:{type:String,require:true},
    pincode:{type:String,require:true},
    state:{type:String,require:true},
    activities:{type:String,require:true},
    adress:{type:String,require:true},
     
})


const offlineClientModel = mongoose.model('offlineClient',offlineClientSchema)

module.exports = offlineClientModel