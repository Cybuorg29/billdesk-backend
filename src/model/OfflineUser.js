const mongoose = require('mongoose');

const offlineUserModelSchema = mongoose.Schema({
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
    type:{type:'200'|'100',require:true}  
})

const OfflineUserModel = mongoose.model('Offline User',offlineUserModelSchema);

module.exports  =  OfflineUserModel;