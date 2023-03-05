const mongoose = require('mongoose')

const DiscountSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    desc: {
        type: String,
        required: [true, 'Please provide description']
    },
    percent: {
        type: Number,
        required: [true, 'Please provide percent']
    },
    flavor: {
        type: String,
        required: [true, 'Please provide flavor']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    expired: {
        type: Date,
        required: [true, 'Please provide expired']
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide shopId']
    }
})
module.exports = mongoose.model('Discount', DiscountSchema)