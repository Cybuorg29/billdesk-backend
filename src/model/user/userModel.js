const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
 
const userModelSchema = new mongoose.Schema({
    
     username:{type:String},
     password:{type:String}   ,
     token:{type:String}



},{
    timestamps: true,
});

userModelSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
 

  userModelSchema.statics.login = async function (username, password) {
    console.log(username,password)
    const user = await this.findOne({ username });
     console.log(user)
      
    if (user) {
      const auth =  bcrypt.compare(password, user.password);

      if (auth) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '365d',
          })
        
        return token;
      }
      throw Error('Incorrect Password');
    }
    throw Error('No user match the credentials please check any type error and try again');
  };



  userModelSchema.statics.convertToken=async function (token){
      const id = jwt.verify(token,process.env.SECRET_KEY)
       return id 

  }


const UserModel = mongoose.model('users', userModelSchema)

module.exports = UserModel