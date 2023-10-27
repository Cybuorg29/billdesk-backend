const mongoose = require('mongoose')

const ExpencesSchema = new mongoose.Schema({
    title: { type: String, require: true },
    category: { type: String, require: true },
    amount: { type: Number, require: true },
    id: { type: String, require: true },
    date: { type: String, require: true },
    uid: { type: String }
},{
    timestamps:true
})


const expencesModel = mongoose.model('expences', ExpencesSchema)

module.exports = expencesModel;