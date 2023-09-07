const profileModel = require("../../model/ProfileModel");
const connectionModel = require("../../model/connectionModel");
const UserModel = require("../../model/userModel");

exports.getConnections = async (req, res) => {
      try {

            console.log('asdasd')
            const { token } = req.params;
            const _id = await UserModel.convertToken(token);
            const Connections = await connectionModel.find({ $or: [{ cid: _id }, { sid: _id }] });
            let data = []
               data = await  Connections.map(async(index) => {
                   let res;
                    if(index.type){
                        res = await profileModel.findOne({id:index.cid});
                        res = await {...res,role:0};
                    }else{
                       res = await profileModel.findOne({id:index.sid});
                       res =  await {...res,role:1};

                    }
                     console.log(res)
                    if(!res){
                        console.log('asdasdasd')
                    }else{
                        return res
                    }
            })
            console.log('data',data);
            return res.status(200).json({ code: 200, package: data })
      } catch (err) {
            console.log(err.message);
            return res.status(200).json({ code: 500, message: 'an error occured', error: err.message })
      }
}