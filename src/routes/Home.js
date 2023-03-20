const express = require('express')
const router = express.Router()

const { index } = require('../app/controllers/Home')

const { login, register } = require('../app/controllers/Auth')


router.get('/', index)
router.get('/register', register)
router.get('/login', login)

module.exports = router