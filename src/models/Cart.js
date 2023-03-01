const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    cakeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide cakeId']
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide quantity']
    },
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide discountId']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
})

module.exports = mongoose.model('Cart', CartSchema)