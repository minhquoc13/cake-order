const express = require('express')
const router = express.Router()

const { createCake, getAllCake, getCakeOfShop, getCake, updateCake, deleteCake, viewCake } = require('../app/controllers/Cake')

router.get('/cake/:id', viewCake)
router.post('/api/v1/cake', createCake)
router.get('/api/v1/cake', getAllCake)
router.get('/api/v1/cake/shop/:shopId', getCakeOfShop)
router.get('/api/v1/cake/:id', getCake)
router.patch('/api/v1/cake/:id', updateCake)
router.delete('/api/v1/cake/:id', deleteCake)

module.exports = router