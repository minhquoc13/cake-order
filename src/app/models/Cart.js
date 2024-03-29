const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    items: {
        type: Object
    },
    totalQty: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)