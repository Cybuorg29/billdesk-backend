const mongoose = require('mongoose');

const ConnectionModelSchema = new mongoose.Schema({
    sid:{type:String,require:true},
    cid:{type:String,require:true},
    status:{type:Boolean,require:true},
    type:{type:Number,require:true}

})

const connectionModel = mongoose.model('connections',ConnectionModelSchema);

module.exports = connectionModel;