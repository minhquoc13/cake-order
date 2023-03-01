const express = require('express')
const router = express.Router()

const { getAllUser, getUser, updateUser, deleteUser } = require('../controllers/User')

router.get('/user', getAllUser)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router