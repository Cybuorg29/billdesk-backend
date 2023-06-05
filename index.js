const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
require('./database/connection')
const port = process.env.PORT
const userRouter = require('./src/router/userRouter')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors())
app.use('/api',userRouter)


app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})

