


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userModelSchema = new mongoose.Schema({

    name: { type: String },
    phone: { type: String },
    email: { type: String },
    username: { type: String },
    password: { type: String }

}, {
    timestamps: true,
});


userModelSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    console.log(user)
    if (user) {
        //   const auth = await bcrypt.compare(password, user.password);
        const auth = await bcrypt.compare(password, user.password)
        console.log(auth)

        if (auth) {
            const token = jwt.sign(user._id, process.env.SECRET_KEY)
            console.log(token)
            return token
        }
        throw Error('Incorrect Password');
    }
    throw Error('No user found');
};

userModelSchema.statics.convertToken = async function (token) {
    const id = jwt.verify(token, process.env.SECRET_KEY)
    return id.id
}

const USERModel = mongoose.model('accounts', userModelSchema)

module.exports = USERModel