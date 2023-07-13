const { default: mongoose } = require("mongoose");


const employeeSchema = mongoose.Schema({
    name: {type:String},
    adress: {type:String},
    salary: {type:Number},
    balance: number,
    id: {type:String},
    image: {type:String}
})

const  employeeModel = mongoose.model('employees',employeeSchema)

module.exports = employeeModel