const connectionModel = require('../../model/connectionModel');
const bankModel = require('../../model/BankModel');
const UserModel = require('../../model/userModel');
const profileModel = require('../../model/ProfileModel');


exports.addOfflineClient = async (req, res) => {
  try {

    const { generalInfo, bankInfo, id } = req.body;
    if (!generalInfo || !bankInfo || !id) return res.status(200).json({ code: 300, message: 'incomplete information please try again ' });


    console.log(generalInfo)
    const { name,
      gstin,
      phone,
      email,
      state,
      activities,
      pincode,
      adress,
    } = generalInfo;

    const { Accountname, no, isfc, bankName, branch } = bankInfo;
    const findClient = await profileModel.findOne({ gstin: gstin, name: name, email: email, phone: phone, state: state, adress: adress });
    console.log('find', findClient);


    if (findClient) return res.status(200).json({ code: 400, message: "Profile Found please add the user ", error: findClient._id });

    const createUser = await UserModel.create({ name: name, email: email, password: '', phone: phone, username: '' });
    createUser.save();
    const createProfile = await profileModel.create({ name: name, gstin, phone, email, adress: adress, state, activities, pincode, isSetUp: false, id: createUser._id, image: '' })
    createProfile.save();
    const CreateBank = await bankModel.create({ bank: bankName, branch: branch, id: createUser._id, isfc: isfc, name: Accountname, no: no });
    CreateBank.save();

    return res.status(200).json({ code: 200, message: 'added sucessfully', package: createProfile })


  } catch (err) {
    console.log(err.message);
    return res.status(200).json({ code: 500, message: 'an error occured please try again', error: err.message })

  }
}