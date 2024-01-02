const profileModel = require("../../model/ProfileModel");
const connectionModel = require("../../model/connectionModel");
const UserModel = require("../../model/userModel");






async function getData(id) {

      let res = await profileModel.findOne({ id: id });

      return res;


}

exports.getConnections = async (req, res) => {
      try {
            let data = {
                  client: [],
                  supplier: []
            }
            console.log('asdasd')
            const { token } = req.params;
            const _id = await UserModel.convertToken(token);
            const Connections = await connectionModel.find({ $or: [{ cid: _id }, { sid: _id }] });
            await Promise.all(Connections.map(async (index) => {
                  (index.type) ? data.client.push(await getData(index.sid)) : data.supplier.push(await getData(index.cid))
            })
            )
            console.log(data)
            return res.status(200).json({ code: 200, package: data });
      } catch (err) {
            console.log(err.message);
            return res.status(200).json({ code: 500, message: 'an error occured', error: err.message })
      }
}