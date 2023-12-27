const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: { type: String },
    gstin: { type: String },
    phone: { type: String },
    email: { type: String },
    state: { type: String },
    pincode: { type: String },
    image: { type: String },
    id: { type: String },
    isSetUp: { type: Boolean },
    activities: { type: String },
    adress: { type: String }
})

const profileModel = mongoose.model('profile', profileSchema)

module.exports = profileModel