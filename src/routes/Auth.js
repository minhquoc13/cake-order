const express = require('express')
const router = express.Router()

const { postRegister, postLogin } = require('../app/controllers/Auth')

router.post('/register', postRegister)
router.post('/login', postLogin)

module.exports = router