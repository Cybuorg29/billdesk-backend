const express = require('express')
const { createExpence, getExpences, deleteExpence, editExpence } = require('../controller/IncomeAndExpence/Expences')
const { createIncome, getIncome } = require('../controller/IncomeAndExpence/Income')

const router = express.Router()


router.post('/create/expence', createExpence)
router.get('/expence/getall/:token', getExpences)
router.post('/create/income', createIncome)
router.get('/income/getall/:token', getIncome)
router.get('/delete/expence/:token/:uid', deleteExpence)
router.post(`/edit/expence`, editExpence)

module.exports = router