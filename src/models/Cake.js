const mongoose = require('mongoose')

const CakeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    desc: {
        type: String,
        // required: [true, 'Please provide description']
    },
    type: {
        type: String,
        // required: [true, 'Please provide type']
    },
    flavor: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    size: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
    },
})

module.exports = mongoose.model('Cake', CakeSchema)