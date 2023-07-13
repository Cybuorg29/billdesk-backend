
exports.createEmployee=(req,res)=>{

    
    try{
        const { data, token } = req.body;
        const { name, adress, salary, balance, id, image } = data
        if (!name || !adress || !salary || !balance || !id || !image || !token) {
             return res.status(200).json({code:400,message:'form not fully filled '})
        }
        
        
    }catch(err){
        return res.status(200).json({code:err.code,message:'en error occured',description:err.message})
    }
    
}