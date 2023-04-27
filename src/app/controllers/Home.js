const Cake = require('../models/Cake')
const { StatusCodes } = require('http-status-codes')
const index = async(req, res) => {
    const items = await Cake.find()
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.status(StatusCodes.OK).render('home', { items })
}

module.exports = { index }