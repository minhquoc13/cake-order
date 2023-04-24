const mongoose = require('mongoose');
const Cart = require('../models/Cart')

const index = (req, res) => {
    res.render('customers/cart')
}

const updateCart = (req, res) => {
    // let cart = {
    //     items: {
    //         itemId: { item: itemObject, qty:0 },
    //         itemId: { item: itemObject, qty:0 },
    //         itemId: { item: itemObject, qty:0 },
    //     },
    //     totalQty: 0,
    //     totalPrice: 0
    // }
    // for the first time creating cart and adding basic object structure
    if (!req.session.cart) {
        req.session.cart = {
            userId: req.user.id,
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }
    let cart = req.session.cart
    if (!cart.items[`${req.body._id}-${req.body.size}`]) {
        cart.items[`${req.body._id}-${req.body.size}`] = {
            item: req.body,
            qty: 1
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    } else {
        cart.items[`${req.body._id}-${req.body.size}`].qty = cart.items[`${req.body._id}-${req.body.size}`].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    }
    return res.json({ cart })
}
const updateCart1 = async(req, res) => {
    const cake = req.body
        // const userId = req.user.id
    const userId = 'user33'
    const cart = await Cart.findOne({ userId: userId })
    if (!cart) {
        cake.qty = 1
        const newCart = await Cart.create({ userId, items: { item: { cake } } })
        return res.json(newCart)
    }
    // check cake exists in cart
    for (const item of cart.items) {
        console.log(item)
        if (item['item']['cake']._id !== cake._id) {
            cake.qty = 1
            const cartUpdate = await Cart.findOneAndUpdate({ userId }, { $push: { items: { item: { cake } } } }, { new: true })
            return res.json({ cartUpdate })
        } else {
            console.log(item['item']['cake']._id, cake._id, item['item']['cake'].size, cake.size)
            if (item['item']['cake']._id == cake._id && item['item']['cake'].size == cake.size) {
                cake.qty = item['item']['cake'].qty + 1
                const cartUpdate = await Cart.findOneAndUpdate({ userId, items: { $elemMatch: { 'item._id': item._id } } }, { $inc: { "items.$.item.cake.qty": cake.qty } }, { new: true })
                return res.json({ cartUpdate })
            } else {
                cake.qty = 1
                const cartUpdate = await Cart.findOneAndUpdate({ userId }, { $push: { items: { item: { cake } } } }, { new: true })
                return res.json({ cartUpdate })
            }
        }
        // const cartUpdate = await Cart.findOneAndUpdate({ userId }, { $push: { items: { item: { cake } } } }, { new: true })
        // console.log(cartUpdate)
    }
    res.json({ cart })
}

const getCart = async(req, res) => {
    const userId = 'user33'
    const itemId = '6446538ab7e1481472a4fa02'
    const cart = await Cart.findOne({ userId: userId, items: { $elemMatch: { 'item._id': itemId } } })
    res.json(cart)
}
module.exports = { index, updateCart, getCart }