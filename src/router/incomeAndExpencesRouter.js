const express = require('express')
const { createExpence, getExpences } = require('../controller/tracker/Expences')
const { createIncome, getIncome } = require('../controller/tracker/Income')
const router = express.Router()


router.post('/create/expence', createExpence)
router.get('/expence/getall/:token', getExpences)
router.post('/create/income', createIncome)
router.get('/income/getall/:token', getIncome)

module.exports = router