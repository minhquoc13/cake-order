const express = require('express')
const router = express.Router()

const { index, getOrder, createOrder } = require('../app/controllers/Order')

router.get('/', index)
router.get('/:id', getOrder)
router.post('/', createOrder)

module.exports = router