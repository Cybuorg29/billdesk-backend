const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const profileModel = require("../model/ProfileModel");
const bankModel = require("../model/BankModel");
dotenv.config()
const secret = process.env.SECRET_KEY


exports.signup = async (req, res) => {
  try {
    const { user } = req.body //get data from frontend
    const { password, username } = user;
    console.log(password, username)
    if (!password || !username) {  // data validation
      return res.status(200).json({ code: 404, message: 'please fully fill the form ' })
    }
    // const userExistsbyPhone = await UserModel.findOne({ phone: phone }) //searching user with phone number
    // if (userExistsbyPhone) {
    //    if(userExistsbyPhone.email)
    //   return res.status(200).json({ message: 'user already registered with  this mobile number please login or choose a different phone number ' })

    // }

    // const userExistsbyEmail = await UserModel.findOne({ email: email }) //searching user with email
    // if (userExistsbyEmail) {
    //   return res.status(200).json({ code: 400, message: 'user already registered with this email please login or choose a different email' })
    // }
    //   const userExistsbyUserName = await UserModel.findOne({ username: username }) //searching user with email
    // if (userExistsbyUserName) {
    //   return res.status(200).json({ code: 400, message: 'username taken please use a different username' })
    // }

    const searchUser = await UserModel.findOne({ username: username });
    if (searchUser) {
      console.log('user found');
      console.log(searchUser)
      // if ((searchUser.username === '' && searchUser.password === '') && (searchUser.email === email && searchUser.phone === searchUser.phone)) {
      //   console.log('not claimed');
      //   return res.status(200).json({ code: 400, message: 'user already exists but is  not claimed please verify to claim this profile', package: searchUser._id })
      // }
      if (searchUser.username === username) throw new Error('username is already taken please try with different username');
    }

    console.log(password)
    // create a hashed password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    const pushUser = await UserModel.create({ name, password: hashedPassword, username, email, phone }) //creating new user
    pushUser.save()
    const pushProfile = await profileModel.create({ id: pushUser._id, name: '', gstin: '', phone: '', email: '', building: '', city: '', district: '', image: '', pincode: '', state: '' })
    pushProfile.save()
    const pushBankDetails = await bankModel.create({ no: '', branch: '', isfc: '', name: '', bank: '', id: pushUser._id })
    pushBankDetails.save()
    return res.status(200).json({ code: 200, message: 'Registered sucessfully' })
  } catch (err) {
    console.log(err.message)
    return res.status(200).json({ message: err.message, code: 404, error: err.message })
  }

}

exports.login = async (req, res) => {
  try {

    const { username, password } = req.body;
    console.log(username, password)



    if (!username || !password) {
      return res.status(200).json({ code: 400, message: 'please enter all the credentials' })
    }


    //    const token = await UserModel.login(username,password)
    const isUser = await UserModel.findOne({ username: username })
    if (!isUser) {
      throw new Error('no user found')
    }
    const passwordCheck = await bcrypt.compare(password, isUser.password)
    console.log(passwordCheck)
    if (!passwordCheck) {
      throw new Error('incorrect password')
    }
    //is password is correct create a auth token for the  user
    const id = isUser._id
    const token = jwt.sign({ id }, secret)
    //   console.log(token)
    return res.status(200).json({ code: 200, message: 'logined sucessfully', token: token })



  } catch (err) {
    console.log(err.message)
    return res.status(200).json({ code: 500, message: err.message })
  }


}

exports.verify = async (req, res) => {
  try {

    const { token } = req.params;
    const id = await UserModel.convertToken(token);
    const isUser = await UserModel.findOne({ _id: id })

    if (!isUser) {

      throw new Error({ code: 400, error: 'token not verified' })

    }
    return res.status(200).json({ code: 200, package: {} })

  } catch (err) {
    console.log(err.message)
    return res.status(200).json({ code: 500, message: 'cannot verify your login please try again  ', error: err.message })
  }
}


exports.claim = async (req, res) => {
  try {

    const { id, username, password, info } = req.body;
    //  console.log(r)
    if (!id || !username || !password || !info) throw new Error('incomplete info')
    console.log(id, username, password, info)

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log('asdasda', hashedPassword)

    const update = await UserModel.findOneAndUpdate(
      {
        $or:
          [
            { _id: id, phone: info, username: '', password: '' },
            { _id: id, email: info, username: '', password: '' }
          ]
      }, {
      $set: {
        username: username,
        password: await bcrypt.hash(password, salt)
      }
    }
    )
    if (!update) throw new Error('no user is linked with this info');
    await update.save()
    return res.status(200).json({ code: 200, message: 'sucessfull ' });





  } catch (err) {
    console.log(err.message)
    return res.status(200).json({ code: 404, message: 'an error occured while claming this profile', error: err.message })
  }

}

