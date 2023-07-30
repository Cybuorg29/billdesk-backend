const incomeModel = require("../../model/IncomeModel");
const UserModel = require("../../model/userModel");
const { getDate } = require("../../utils/date/createDate");

exports.createIncome = async (req, res) => {
  try {

    const { title, amount, category, token } = req.body;
    if (!title || !amount || !category || !token) {
      return res.status(200).json({ code: 400, message: "please fill the info" })
    }
    const id = await UserModel.convertToken(token)
    if (!id) {
      throw new Error('user not found')
    }
      const date = getDate()
    const pushIncome = await incomeModel.create({ title, amount, category, id, date: date })
    if (!pushIncome) throw new Error("an error occured")
    return res.status(200).json({ code: 200, message: 'Income Added Sucessfully', income: pushIncome })

  } catch (err) {
    console.log(err.message)
    return res.status(200).json({ code: 500, message: 'an error occured' })
  }
}

exports.getIncome = async (req, res) => {
  try {

    const { token } = req.params;
    if (!token) {
      return res.status(200).json({ code: 400, message: 'an error occured ' })
    }
    const id = await UserModel.convertToken(token)
    if (!id) {
      throw new Error('user not found')
    }
    const income = await incomeModel.find({ id: id })
    return res.status(200).json({ code: 200, message: 'opertaion completed sucessfully', income: income })
  } catch (err) {
    console.log(err.message)
    return res.status(200).json({ code: 500, message: err.message })
  }

}