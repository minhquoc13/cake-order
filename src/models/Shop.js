const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    address: {
        type: String,
        required: [true, 'Please provide address']
    }
})

module.exports = mongoose.model('Shop', ShopSchema)