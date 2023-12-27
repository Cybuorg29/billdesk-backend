const connectionModel = require('../../model/connectionModel');
const bankModel = require('../../model/BankModel');
const UserModel = require('../../model/userModel');
const profileModel = require('../../model/ProfileModel');


exports.addOfflineClient = async (req, res) => {
  try {

    const { generalInfo, bankInfo, token } = req.body;
    if (!generalInfo || !bankInfo || !token) return res.status(200).json({ code: 300, message: 'incomplete information please try again ' });

    const { name,
      gstin,
      phone,
      email,
      building,
      city,
      district,
      state,
      activities,
      pincode,
      type,
    } = generalInfo;

    const { Accountname, no, isfc, bankName, branch } = bankInfo;
    const _id = await UserModel.convertToken(token);
    const findClient = await profileModel.findOne({ gstin: gstin });
    if (findClient) return res.status(200).json({ code: 400, message: "user already exists on the platform ", error: findClient._id });

    const createUser = await UserModel.create({ name: name, email: email, password: '', phone: phone, username: '' });
    createUser.save();
    const createProfile = await profileModel.create({ name: name, gstin, phone, email, adress, state, activities, pincode, type, isSetUp: false, id: createUser._id, image: '' })
    createProfile.save();
    const CreateBank = await bankModel.create({ bank: bankName, branch: branch, id: createUser._id, isfc: isfc, name: Accountname, no: no });
    CreateBank.save();
    console.log('save')

    let sid = '';
    let cid = '';
    console.log('asdasda')
    if (type === 1) {
      sid = _id;
      cid = createUser._id

    } else {
      cid = _id
      sid = createUser._id;
      t = 1;
    }
    console.log('conn')
    const createConnection = await connectionModel.create({ cid: cid, sid: sid, status: true, type: t });

    return res.status(200).json({ code: 200, message: 'added sucessfully', package: createUser._id })


  } catch (err) {
    console.log(err.message);
    return res.status(200).json({ code: 500, message: 'an error occured please try again', error: err.message })

  }
}