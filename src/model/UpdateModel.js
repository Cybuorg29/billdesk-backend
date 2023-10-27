const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    title:String,require:true,
    id:String,require:true,
    type:String,require:true
})

const  updateModel = mongoose.model('updates',updateSchema)

module.exports = updateModel;