const expencesModel = require("../../model/ExpencesModel");
const incomeModel = require("../../model/IncomeModel");
const UserModel = require("../../model/userModel");

exports.getIncomeAndExpenceByMonth=async(req,res)=>{
    
    try{
          const  {token,month} = req.params;
          if(!token||!month){
            return res.status(200).json({code:400,message:'an error occured try again'})
          }
          const mon = parseInt(month)
            console.log(mon)
          const id = await UserModel.convertToken(token);
          const d = new Date()
         let  day = (d.getDate() - d.getDate() ) +1
         const greaterMonth = String(mon ).padStart(2, '0'); 
         const Lessmonth = String(mon + 1 ).padStart(2, '0');
         let year = d.getFullYear()
         var twoDigitYear = year.toString().substr(-2);
        
           console.log(greaterMonth,Lessmonth)
         const exp = await  expencesModel.find({id:id})
          const expence = [];
 
           if(mon>12){
            exp.map((index)=>{
              const d = index.date.split('-')
                const year = d[2];
                 console.log('year',year)
                if(twoDigitYear===year){
                    console.log('asdasdas')
                          expence.push(index)
         }
           })
           const inc = await incomeModel.find({id:id});
           const income = [];
           inc.map((index)=>{
              const d = index.date.split('-');
                const year = d[2];
                if(twoDigitYear===year){
                 //   console.log('year')
                  income.push(index)
              
                }
           })



           return res.status(200).json({code:200,message:'',expence:expence,income:income})

           }

          exp.map((index)=>{
             const d = index.date.split('-')
              const day = d[0];
              const month = d[1];
               const year = d[2];
               if(twoDigitYear===year){
                //   console.log('year')
                 if(greaterMonth<=month){
                     console.log(month)
                     if(month<Lessmonth){
                         console.log('index')
                         console.log(month,Lessmonth)
                         expence.push(index)
                     }
                 }
               }
          })

          const inc = await incomeModel.find({id:id});
          const income = [];
          inc.map((index)=>{
             const d = index.date.split('-')
              const day = d[0];
              const month = d[1];
               const year = d[2];
               if(twoDigitYear===year){
                //   console.log('year')
                 if(greaterMonth<=month){
                     console.log(month)
                     if(month<Lessmonth){
                         console.log('index')
                         console.log(month,Lessmonth)
                         income.push(index)
                     }
                 }
               }
          })

          return res.status(200).json({code:200,message:"",expence:expence,income:income})




      }catch(err){
        console.log(err);
         return res.status(200).json({code:500,message:'an error has occured  ',error:err.message})
      }
}