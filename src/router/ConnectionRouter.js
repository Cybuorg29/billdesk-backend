const express = require('express');
const router = express.Router();
const  {getConnections}  = require('../controller/connection/get');
const { addOfflineClient } = require('../controller/OfflineUser/CreateOfflineUser');

router.post('/user/create/connection',addOfflineClient);
router.get('/user/get/connectiondata/:token',getConnections);


module.exports = router