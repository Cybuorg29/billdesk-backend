const mongoose = require('mongoose');

const offlineUserModelSchema = new mongoose.Schema({
    name:{type:String,require:true},
    gstin:{type:String,require:true},
    phone:{type:String,require:true},
    email:{type:String,require:true},
    building:{type:String,require:true},
    city:{type:String,require:true},
    district:{type:String,require:true},
    state:{type:String,require:true},
    activities:{type:String,require:true},
    pincode:{type:String,require:true},
    type:{type:Number,require:true} ,
    role:{type:Number,require:true} 
})

const OfflineUserModel = mongoose.model('Offline User',offlineUserModelSchema);

module.exports  =  OfflineUserModel;