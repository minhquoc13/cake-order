const express = require('express')
const router = express.Router()

const { index, updateCart, getCart } = require('../app/controllers/Cart')

router.post('/api/v1/cart/update-cart', updateCart)
router.get('/cart', index)

module.exports = router