const express = require('express')
const router = express.Router()

const { index, updateCart } = require('../app/controllers/Cart')

router.patch('/update-cart', updateCart)

module.exports = router