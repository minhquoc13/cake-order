const Cake = require('../models/Cake')
const { StatusCodes } = require('http-status-codes')
const index = async(req, res) => {
    const items = await Cake.find()
    items.forEach(item => {
        // updat price low to high price
        const lengthArray = item['price'].length
        const newPrice = item['price'][0] + ' - ' + item['price'][lengthArray - 1]
        if (lengthArray > 1) {
            item['price'] = [newPrice]
        }
    })
    res.status(StatusCodes.OK).render('home', { items })
}

module.exports = { index }