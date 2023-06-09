const express = require('express')
const { register, login, verify, getUserName, getUser } = require('../controller/userController')
const { AddClient, getClients } = require('../controller/ClientController')

const router = express.Router()

router.post('/user/register',register)
router.post('/user/login',login)
router.get('/user/verify/:token',verify)
router.get('/user/getname/:token',getUserName)
router.post('/user/addclient',AddClient)
router.get(`/user/getUser/:token`,getUser)
router.get('/user/getclients/:token',getClients)



module.exports = router