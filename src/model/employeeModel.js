const { default: mongoose } = require("mongoose");


const employeeSchema = mongoose.Schema({
    name: {type:String},
    adress: {type:String},
    salary: {type:Number},
    balance: {type:Number},
    id: {type:String},
    image: {type:String},
    type:{type:Number},
    phone:{type:String}
},{
    timestamps: true,
})

const  employeeModel = mongoose.model('employees',employeeSchema)

module.exports = employeeModel