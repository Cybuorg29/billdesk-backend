const express = require('express')
const { createEmployee } = require('../controller/employee/create');
const { getEmployee } = require('../controller/employee/get');
const router = express.Router()


router.post('/create/employee',createEmployee);
router.get('/get/employee/:token',getEmployee)


module.exports = router;