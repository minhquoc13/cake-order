const express = require('express')
const router = express.Router()

const { createCake, getAllCake, getCake, updateCake, deleteCake } = require('../app/controllers/Cake')

router.post('/', createCake)
router.get('/', getAllCake)
router.get('/:id', getCake)
router.patch('/:id', updateCake)
router.delete('/:id', deleteCake)

module.exports = router