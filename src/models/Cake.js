const mongoose = require('mongoose')

const CakeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    desc: {
        type: String,
        required: [true, 'Please provide description']
    },
    type: {
        type: String,
        required: [true, 'Please provide type']
    },
    flavor: {
        type: String,
        required: [true, 'Please provide flavor']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    size: {
        type: String,
        required: [true, 'Please provide size']
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide shopId']
    },
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide discountId']
    },
})