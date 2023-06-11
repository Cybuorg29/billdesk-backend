const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const userRouter  = require( './src/router/userRouter')
const profileRouter = require('./src/router/profileRouter')
require('dotenv').config()
require('./database/connection')
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors())
app.use('/api',userRouter)
app.use('/api',profileRouter)

app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})

