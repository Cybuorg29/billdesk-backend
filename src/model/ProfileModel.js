const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: { type: String, require: true },
    gstin: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    state: { type: String, require: true },
    pincode: { type: String, require: true },
    image: { type: String },
    id: { type: String, require: true },
    isSetUp: { type: Boolean, require: true },
    activities: { type: String, require: true },
    adress: { type: String, require: true }
})

const profileModel = mongoose.model('profile', profileSchema)

module.exports = profileModel