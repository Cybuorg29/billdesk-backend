const express = require('express')
const { createExpence, getExpences } = require('../controller/tracker/Expences')
const { createIncome } = require('../controller/tracker/Income')
const router = express.Router()


router.post('/expence/create',createExpence)
router.post('/expence/getall',getExpences)
router.post('/income/create',createIncome)

module.exports = router