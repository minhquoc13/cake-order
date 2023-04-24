const express = require('express')
const router = express.Router()

const { index, updateCart, getCart } = require('../app/controllers/Cart')

router.post('/update-cart', updateCart)
router.get('/cart', getCart)

module.exports = router