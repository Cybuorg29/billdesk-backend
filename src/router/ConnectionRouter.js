const express = require('express');
const router = express.Router();
const  {getConnections}  = require('../controller/connection/get');
const { addOfflineClient } = require('../controller/OfflineUser/CreateOfflineUser');
const { deleteConnection } = require('../controller/connection/Delete');
const { handleRequest } = require('../controller/connection/handleRequests');

router.post('/user/create/connection',addOfflineClient);
router.get('/user/get/connectiondata/:token',getConnections);
router.get('/user/delete/connection/:token/:id/:role',deleteConnection)
router.post(`/user/create/connection/request`,handleRequest);

module.exports = router