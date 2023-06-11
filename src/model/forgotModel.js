const mongoose = require('mongoose')

const forgotSchema = new mongoose.Schema({
    id:{type:String,require:true},
    token:{type:String,require:true}
})

const forgotModel = mongoose.model('forgotPassword',forgotSchema)

module.exports = forgotModel;