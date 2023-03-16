const express = require('express')
const router = express.Router()

const { index, getSingleOrder, createOrder } = require('../app/controllers/customer/Order')

router.get('/', index)
router.get('/:id', getSingleOrder)
router.post('/', createOrder)

module.exports = router