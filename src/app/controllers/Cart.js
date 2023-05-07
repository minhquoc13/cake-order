const Cart = require('../models/Cart')

const index = async(req, res) => {
    const userId = req.user.id

    const cart = await Cart.findOne({ userId })
    if (cart === null) {
        res.render('customers/cart', { cartItemsArray: null })
        return
    }
    const cartItems = cart.items // get items from cart

    console.log(cartItems)
    const itemsByCreator = {}
    for (const key in cartItems) {
        const item = cartItems[key].item;
        const createdBy = item.createdBy;

        if (!itemsByCreator[createdBy]) {
            itemsByCreator[createdBy] = [];
        }
        item['qty'] = cartItems[key].qty
        itemsByCreator[createdBy].push(item);
    }
    // console.log(itemsByCreator);
    // for (const property in itemsByCreator) {
    //     console.log(`${property}`)
    //     itemsByCreator[property].forEach(function(item) {
    //         console.log(item)
    //     })
    // }
    const cartItemsArray = Object.values(cartItems)
    res.render('customers/cart', { cartItemsArray, itemsByCreator })
}

const updateCart1 = (req, res) => {
    console.log(req.user)
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
    if (!cart.items[`
                    $ { req.body._id } - $ { req.body.size }
                    `]) {
        cart.items[`
                    $ { req.body._id } - $ { req.body.size }
                    `] = {
            item: req.body,
            qty: 1
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    } else {
        cart.items[`
                    $ { req.body._id } - $ { req.body.size }
                    `].qty = cart.items[`
                    $ { req.body._id } - $ { req.body.size }
                    `].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    }
    return res.json({ cart })
}
const updateCart = async(req, res) => {
    const userId = req.user.id
    const cart = await Cart.findOne({ userId: userId })
    if (!cart) {
        const newCart = {
            userId: userId,
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
        newCart.items[`${ req.body._id }-${ req.body.size }`] = {
            item: req.body,
            qty: 1
        }
        newCart.totalQty = 1
        newCart.totalPrice = req.body.price
        const createCart = await Cart.create(newCart)
        return res.json(createCart)
    }
    // check cake exists in cart
    if (!cart.items[`${ req.body._id }-${ req.body.size }`]) {
        cart.items[`${ req.body._id }-${ req.body.size }`] = {
            item: req.body,
            qty: 1
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    } else {
        cart.items[`${ req.body._id }-${ req.body.size }`].qty = cart.items[`${req.body._id }-${req.body.size}`].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    }
    const updateCart = await Cart.findOneAndUpdate({ userId }, cart, { new: true })
    res.json({ updateCart })
}

const getCart = async(req, res) => {
    const userId = 'user33'
    const itemId = '6446538ab7e1481472a4fa02'
    const cart = await Cart.findOne({ userId: userId, items: { $elemMatch: { 'item._id': itemId } } })
    res.json(cart)
}
module.exports = { index, updateCart, getCart }