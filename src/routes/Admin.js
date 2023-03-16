const express = require('express')
const router = express.Router()

const { getAllUser, getUser, updateUser, deleteUser } = require('../app/controllers/User')
const { index, getSingleOrder, updateStatusOrder } = require('../app/controllers/admin/Order')

router.get('/user', getAllUser)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// order manager
router.get('/order', index)
router.get('/order/:id', getSingleOrder)
router.patch('/order', updateStatusOrder)


module.exports = router