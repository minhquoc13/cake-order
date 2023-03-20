const Order = require('../../models/Order')
const { BadRequestError } = require('../../errors/index')
const { StatusCodes } = require('http-status-codes')
const { HttpStatusCode } = require('axios')

const index = async(req, res) => {
    const orders = await Order.find({}, null, { sort: { 'createdAt': -1 } })
    res.json(orders)
}

const getSingleOrder = async(req, res) => {
    const order = await Order.findById(req.params.id)
    res.json(order)
}

const updateStatusOrder = async(req, res) => {
    const order = await Order.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status }, {
        new: true
    })
    res.json(order)
}

const deleteOrder = async(req, res) => {
    const order = Order.findOneAndDelete({ _id: req.params.id })
    if (!order) {
        throw new NotFoundError(`No Order with id ${req.params.id}`)
    }
    res.status(HttpStatusCode.Ok).json({ msg: `Cake with id: ${cakeId} has been deleted` })
}

module.exports = { getSingleOrder, index, updateStatusOrder }