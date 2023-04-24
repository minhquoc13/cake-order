const Cake = require('../models/Cake')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors/')

const createCake = async(req, res) => {
    // req.body.createdBy = req.user['id']
    req.body.createdBy = 'shop'
    const size = req.body.size
    const lastPriceProp = Object.keys(size).pop();
    const lastPrice = size[lastPriceProp]
    const firstPrice = size[Object.keys(size)[0]]
    const price = firstPrice + ' - ' + lastPrice
    req.body['priceDisplay'] = price
        // handle size to display
    let sizeDisplay = Object.keys(req.body['size'])
    req.body['sizeDisplay'] = sizeDisplay
    const cake = await Cake.create({...req.body })
    res.status(StatusCodes.CREATED).json({ cake })
}

const getAllCake = async(req, res) => {
    const cakes = await Cake.find({})
    res.status(StatusCodes.OK).json({ cakes })
}

const getCake = async(req, res) => {
    const cakeId = req.params.id
    const cake = await Cake.findOne({ _id: cakeId })
    if (!cake) {
        throw new NotFoundError(`Cant find Cake with id: ${cakeId}`)
    }
    res.status(StatusCodes.OK).json({ cake })
}

const getCakeOfShop = async(req, res) => {
    const shopId = req.params.shopId
    const limit = req.query.limit

    const cakes = await Cake.find({ createdBy: shopId }, {
        limit: limit
    })
    res.status(StatusCodes.OK).json({ cakes, count: cakes.length })
}

const updateCake = async(req, res) => {
    const {
        body: { name, desc, type, flavor, price, size },
        user: { userId },
        params: { id: cakeId },
    } = req

    if (name === '' || desc === '' || type === '' || flavor === '' || price === '' || size === '') {
        throw new BadRequestError('Please provide fully infomation')
    }
    const cake = await Cake.findByIdAndUpdate({ _id: cakeId, createdBy: userId },
        req.body, { new: true, runValidators: true }
    )
    if (!cake) {
        throw new NotFoundError(`No job with id ${cakeId}`)
    }
    res.status(StatusCodes.OK).json({ cake })
}

const deleteCake = async(req, res) => {
    const {
        params: { id: cakeId },
        user: { userId }
    } = req
    const cake = await Cake.findOneAndRemove({ _id: cakeId, createdBy: userId })
    if (!cake) {
        throw new NotFoundError(`No Cake with id ${cakeId}`)
    }
    res.status(StatusCodes.OK).json({ msg: `Cake with id: ${cakeId} has been deleted` })
}

const viewCake = async(req, res) => {
    const cakeId = req.params.id
    const cake = await Cake.findOne({ _id: cakeId })
    res.render('cake-detail', { cake })
}

module.exports = { createCake, getAllCake, getCakeOfShop, getCake, updateCake, deleteCake, viewCake }