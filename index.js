const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter  = require( './src/router/userRouter')
const profileRouter = require('./src/router/profileRouter')
const trackerRouter = require('./src/router/incomeAndExpencesRouter')
const employeerouter = require('./src/router/employeeRouter')
require('dotenv').config()
require('./database/connection')
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors())
app.use('/api',userRouter)
app.use('/api',profileRouter)
app.use('/api',trackerRouter)
app.use('/api',employeerouter)

app.get('/',(req,res)=>{
      res.json('connected')
})

app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})

