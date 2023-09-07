

const express = require('express');
const {addOfflineClient  } = require('../controller/OfflineUser/CreateOfflineUser');
const { getConnections } = require('../controller/connection/get');
const router = express.Router();

router.post('/user/create/connection',addOfflineClient);
router.get('/user/get/connectiondata/:token',getConnections);


module.exports = router