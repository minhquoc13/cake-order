const express = require('express')
const router = express.Router()

const { index } = require('../app/controllers/Home')

router.get('/', index)

module.exports = router