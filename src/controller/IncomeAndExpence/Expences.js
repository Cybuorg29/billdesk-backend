const expencesModel = require("../../model/ExpencesModel");
const UserModel = require("../../model/userModel");

exports.createExpence = async (req, res) => {
    try {

        console.log(req.body)
        const { data } = req.body
        const { title, amount, category, token, date ,uid} = data;


        if (!title || !amount || !category || !token) {

            return res.status(200).json({ code: 400, message: "please fill the info" })
        }
        const id = await UserModel.convertToken(token)
        if (!id) {
            throw new Error('user not found')
        }
        const pushExpences = await expencesModel.create({ title, amount, category, id, date: date,uid:uid })
        console.log(pushExpences)
        if (!pushExpences) throw new Error("an error occured")
        return res.status(200).json({ code: 200, message: 'Expence Added Sucessfully', expence: pushExpences })
    } catch (err) {
        console.log(err)
        return res.status(200).json({ code: 500, message: 'an error occured. please try again' })
    }

}

exports.getExpences = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(200).json({ code: 400, message: 'an error occured on user side please try again' })
        }
        const id = await UserModel.convertToken(token)
        if (!id) {
            return res.status(200).json({ code: 400, message: 'an error occured on user side please try again' })
        }
        const expences = await expencesModel.find({ id: id })
        if (!expences) {
            return res.status(200).json({ code: 200, message: 'No expences registered please add ' })
        }
        return res.status(200).json({ code: 200, expences: expences })



    } catch (err) {
        console.log(err.message)
        return res.status(200).json({ code: 500, message: 'an error occured' })
    }
}


exports.deleteExpence = async (req, res) => {
    try {

        const { token, uid } = req.params;
        if (!token || !uid) {
            throw new Error({ code: 400, message: 'an error occured please try again' })
        }
        const id = await UserModel.convertToken(token);
        const deleteExpence = await expencesModel.findOneAndDelete({ _id: id, id: uid })
        return res.status(200).json({ code: 200, message: 'Expence Delete Sucessfully' })

    } catch (err) {
        return res.status(200).json({ code: err.code, message: err.message })

    }



}

exports.editExpence = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data) {

            return res.status(200).json({ code: 400, message: 'an error ocuured please try again' })
        }
        const { _id, title, category, amount, id, date } = data;
        if (!_id || !title || !category || !amount || !id || !date) {
            return res.status(200).json({ code: 400, message: 'an error ocuured please retry' })
        }
        console.log(_id, title, category, amount, id, date)
        const updateExpence = await expencesModel.findOneAndUpdate({ _id: _id, id: id }, { $set: { title: title, amount: amount, category: category } });
        if (!updateExpence) {
            return res.status(200).json({ code: 500, message: 'an error occured in editing . please try again' })
        }
        return res.status(200).json({ code: 200, message: ' Edited Sucessfully', obj: updateExpence });


    } catch (err) {
        return res.status(200).json({ code: err.code, message: err.messsage })
    }
}