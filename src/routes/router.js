const express = require('express')
const router = express.Router()

const { createUser } = require('../controllers/User')

router.post('/create-user', createUser)

module.exports = router