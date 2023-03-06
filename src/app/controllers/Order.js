const Order = require('../models/Order')
const { BadRequestError } = require('../errors/index')
const { StatusCodes } = require('http-status-codes')

// const createOrder = (req, res) => {
//     // validate request
//     const { phone, address, note } = req.body
//     if (!phone || !address) {
//         throw new BadRequestError('Please provide email and password', 422)
//     }

//     const order = new Order({
//         customerId: req.user._id,
//         items: req.session.cart.items,
//         note,
//         phone,
//         address
//     })

//     order.save().then(result => {
//         Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
//             placedOrder.save().then(order => {
//                 delete req.session.cart
//                 return res.json({ order, message: 'Order placed successfully' })
//             })
//         }).catch(err => {
//             res.json({ msg: 'Something went wrong' })
//         })
//     }).catch(err => {
//         return res.status(500).json({ message: 'Something went wrong' });
//     })
// }
const createOrder = (req, res) => {
    // validate request
    const { customerId, items, phone, address, note } = req.body
    if (!phone || !address) {
        throw new BadRequestError('Please provide email and password', 422)
    }

    // test data
    const order = new Order({
        customerId,
        items,
        note,
        phone,
        address
    })
    order.save().then(result => {
        Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
            placedOrder.save().then(order => {
                delete req.session.cart
                return res.json({ order, message: 'Order placed successfully' })
            })
        }).catch(err => {
            res.json({ msg: 'Something went wrong', err })
        })
    }).catch(err => {
        return res.status(500).json({ message: 'Something went wrong', err });
    })
}

const index = async(req, res) => {
    const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })
    res.json(orders)
}

const getOrder = async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (req.user._id.toString() === order.customerId.toString()) {
        res.json(order)
    }
}

module.exports = { createOrder, getOrder, index }