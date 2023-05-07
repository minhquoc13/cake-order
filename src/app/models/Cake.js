const mongoose = require('mongoose')

const CakeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
    },
    priceDisplay: {
        type: String,
    },
    size: {
        type: Object,
        required: [true, 'Please provide size & price'],
    },
    sizeDisplay: {
        type: Array,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId
    },
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    qty: {
        type: Number,
    }
}, { timestamps: true })

module.exports = mongoose.model('Cake', CakeSchema)