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
        type: String,
    },
    size: {
        type: Object,
        required: [true, 'Please provide size & price'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
    },
}, { timestamps: true })

module.exports = mongoose.model('Cake', CakeSchema)