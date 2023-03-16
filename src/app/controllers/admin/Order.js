const Order = require('../../models/Order')
const { BadRequestError } = require('../../errors/index')
const { StatusCodes } = require('http-status-codes')

const index = async(req, res) => {
    const orders = await Order.find({}, null, { sort: { 'createdAt': -1 } })
    res.json(orders)
}

const getSingleOrder = async(req, res) => {
    const order = await Order.findById(req.params.id)
    res.json(order)
}

const updateStatusOrder = async(req, res) => {
    const order = await Order.findOneAndUpdate({ _id: '6413298ce7aa71bf30b1d6c5' }, { status: req.body.status }, {
        new: true
    })
    res.json(order)
}

module.exports = { getSingleOrder, index, updateStatusOrder }