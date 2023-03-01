const Cake = require('../models/Cake')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors/')

const createCake = async(req, res) => {
    req.body.createdBy = req.user.userId
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

module.exports = { createCake, getAllCake, getCake, updateCake, deleteCake }