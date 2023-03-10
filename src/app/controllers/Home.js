const Cake = require('../models/Cake')
const { StatusCodes } = require('http-status-codes')
const index = async(req, res) => {
    const items = await Cake.find()
    items.forEach(cake => {
        const size = cake['size']
        const lastPrice = Object.keys(size).pop();
        const firstPrice = size[Object.keys(size)[0]]
        const price = firstPrice + ' - ' + lastPrice
        cake['price'] = price
    })
    res.status(StatusCodes.OK).render('home', { items })
}

module.exports = { index }