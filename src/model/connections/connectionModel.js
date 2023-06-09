const mongoose = require('mongoose')

const connectionsSchema= new mongoose.Schema({
    sender:{type:String,require:true},
    receiver:{type:String,require:true},
    isAproved:{type:Boolean,require:true},
    transport:{type:String,require:true},
    terms:[]
})

const connectionModel = mongoose.model('connections',connectionsSchema)

module.exports = connectionModel