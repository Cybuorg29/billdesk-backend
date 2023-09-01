

const express = require('express');
const { addOfflienClient } = require('../controller/OfflineUser/CreateOfflineUser');
const router = express.Router();

router.post('/create/connection',addOfflienClient);


module.exports = router