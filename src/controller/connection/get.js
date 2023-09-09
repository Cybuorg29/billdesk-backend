const profileModel = require("../../model/ProfileModel");
const connectionModel = require("../../model/connectionModel");
const UserModel = require("../../model/userModel");





let data =[];

 async function  getData(type,id){
    if(type){
        res = await profileModel.findOne({id:id});
        res = await {...res?._doc,role:0};
        console.log(res)
        data.push(res)
    }else{
        res = await profileModel.findOne({id:id});
        res = await {...res?._doc,role:1};

        console.log(res)
        data.push(res)
    }

}

exports.getConnections = async (req, res) => {
      try {

            console.log('asdasd')
            const { token } = req.params;
            const _id = await UserModel.convertToken(token);
            const Connections = await connectionModel.find({ $or: [{ cid: _id }, { sid: _id }] });
             await  Promise.all(Connections.map(async(index)=>{
                   (index.type)? await getData(index.type,index.sid): await getData(index.type,index.cid)
               })
             )

                console.log(data)
            
            return res.status(200).json({ code: 200, package: data});
      } catch (err) {
            console.log(err.message);
            return res.status(200).json({ code: 500, message: 'an error occured', error: err.message })
      }
}