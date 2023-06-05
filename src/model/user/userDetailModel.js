const mongoose = require('mongoose')

const userDetailSchema = new mongoose.Schema({
    name:{type:String,require:true},
    gstin:{type:String,require:true},
    phone:{type:String,require:true},
    email:{type:String,require:true},
    building:{type:String,require:true},
    landmark:{type:String,require:true},
    District:{type:String,require:true},
    pincode:{type:String,require:true},
    state:{type:String,require:true},
    Activities:{type:String,require:true},
    adress:{type:String,require:true},
    id:{type:String,require:true},
    inNo:{type:String,require:true}

})

const UserDetailModel = mongoose.model('usersDetails', userDetailSchema)

module.exports = UserDetailModel